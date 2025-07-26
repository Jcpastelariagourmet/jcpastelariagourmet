'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase, type User } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

/**
 * Hook principal para gerenciamento de autenticação
 */
export function useAuth(): UseAuthReturn {
  const {
    user,
    isLoading,
    isAuthenticated,
    signIn: storeSignIn,
    signUp: storeSignUp,
    signOut: storeSignOut,
    updateUser,
    setUser,
    setLoading
  } = useAuthStore();

  const router = useRouter();

  // Função para atualizar dados do usuário
  const refreshUser = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  // Função de login com validações
  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      return { success: false, error: 'Email e senha são obrigatórios' };
    }

    const result = await storeSignIn(email, password);
    
    if (result.success) {
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Erro ao fazer login');
    }

    return result;
  };

  // Função de registro com validações
  const signUp = async (name: string, email: string, password: string, phone?: string) => {
    if (!name || !email || !password) {
      return { success: false, error: 'Nome, email e senha são obrigatórios' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
    }

    const result = await storeSignUp(name, email, password, phone);
    
    if (result.success) {
      toast.success('Conta criada! Verifique seu email para ativar.');
      router.push('/auth/verify-email');
    } else {
      toast.error(result.error || 'Erro ao criar conta');
    }

    return result;
  };

  // Função de logout
  const signOut = async () => {
    await storeSignOut();
    toast.success('Logout realizado com sucesso!');
    router.push('/');
  };

  // Função para resetar senha
  const resetPassword = async (email: string) => {
    if (!email) {
      return { success: false, error: 'Email é obrigatório' };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      toast.success('Email de recuperação enviado!');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao enviar email de recuperação' };
    }
  };

  // Função para atualizar perfil
  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    try {
      await updateUser(updates);
      toast.success('Perfil atualizado com sucesso!');
      return { success: true };
    } catch (error) {
      const errorMessage = 'Erro ao atualizar perfil';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshUser
  };
}

/**
 * Hook para verificar se usuário está autenticado
 * Redireciona para login se não estiver
 */
export function useRequireAuth(redirectTo: string = '/auth/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isChecking: isLoading || isChecking };
}

/**
 * Hook para verificar se usuário NÃO está autenticado
 * Redireciona para dashboard se estiver autenticado
 */
export function useRequireGuest(redirectTo: string = '/dashboard') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isChecking: isLoading || isChecking };
}

/**
 * Hook para verificar nível do usuário
 */
export function useUserLevel() {
  const { user } = useAuth();
  
  const hasLevel = (requiredLevel: User['level']) => {
    if (!user) return false;
    
    const levels = ['bronze', 'silver', 'gold', 'diamond'];
    const userLevelIndex = levels.indexOf(user.level);
    const requiredLevelIndex = levels.indexOf(requiredLevel);
    
    return userLevelIndex >= requiredLevelIndex;
  };

  const getLevelBenefits = () => {
    if (!user) return null;

    const benefits = {
      bronze: {
        discount: 0,
        freeDelivery: false,
        earlyAccess: false,
        pointsMultiplier: 1
      },
      silver: {
        discount: 5,
        freeDelivery: false,
        earlyAccess: false,
        pointsMultiplier: 1.1
      },
      gold: {
        discount: 10,
        freeDelivery: true,
        earlyAccess: false,
        pointsMultiplier: 1.2
      },
      diamond: {
        discount: 15,
        freeDelivery: true,
        earlyAccess: true,
        pointsMultiplier: 1.5
      }
    };

    return benefits[user.level];
  };

  return {
    level: user?.level,
    hasLevel,
    benefits: getLevelBenefits()
  };
}