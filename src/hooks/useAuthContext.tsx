'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase, type User } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de contexto de autenticação
 * Gerencia o estado de autenticação global da aplicação
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { user, setUser, setLoading } = useAuthStore();
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão inicial
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          setSession(initialSession);
          setSupabaseUser(initialSession.user);
          
          // Buscar dados completos do usuário
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', initialSession.user.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão inicial:', error);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };

    getInitialSession();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setSupabaseUser(session?.user || null);

        if (event === 'SIGNED_IN' && session?.user) {
          // Usuário fez login
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        } else if (event === 'SIGNED_OUT') {
          // Usuário fez logout
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Token foi renovado
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          // Dados do usuário foram atualizados
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userData) {
            setUser(userData);
          }
        }

        setIsLoading(false);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  const value: AuthContextType = {
    user,
    supabaseUser,
    session,
    isLoading,
    isAuthenticated: !!user && !!session
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}

/**
 * Hook para verificar permissões baseadas em nível
 */
export function usePermissions() {
  const { user } = useAuthContext();

  const canAccessFeature = (requiredLevel: User['level']) => {
    if (!user) return false;
    
    const levels = ['bronze', 'silver', 'gold', 'diamond'];
    const userLevelIndex = levels.indexOf(user.level);
    const requiredLevelIndex = levels.indexOf(requiredLevel);
    
    return userLevelIndex >= requiredLevelIndex;
  };

  const canManageOrders = () => {
    return !!user; // Qualquer usuário autenticado pode gerenciar seus pedidos
  };

  const canAccessEarlyFeatures = () => {
    return user?.level === 'diamond';
  };

  const getDiscountPercentage = () => {
    if (!user) return 0;
    
    const discounts = {
      bronze: 0,
      silver: 5,
      gold: 10,
      diamond: 15
    };
    
    return discounts[user.level];
  };

  const hasFreeDelivery = () => {
    return user?.level === 'gold' || user?.level === 'diamond';
  };

  return {
    canAccessFeature,
    canManageOrders,
    canAccessEarlyFeatures,
    getDiscountPercentage,
    hasFreeDelivery,
    isAuthenticated: !!user
  };
}