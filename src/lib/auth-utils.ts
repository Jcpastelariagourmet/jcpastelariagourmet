import { supabase, type User } from '@/lib/supabase';
import { toast } from 'react-hot-toast';

/**
 * Utilitários para validação de autenticação
 */

export interface AuthValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): AuthValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email é obrigatório' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida força da senha
 */
export function validatePassword(password: string): AuthValidationResult {
  if (!password) {
    return { isValid: false, error: 'Senha é obrigatória' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Senha deve ter pelo menos 6 caracteres' };
  }
  
  if (password.length > 128) {
    return { isValid: false, error: 'Senha muito longa' };
  }
  
  // Verificar se tem pelo menos uma letra e um número
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return { isValid: false, error: 'Senha deve conter pelo menos uma letra e um número' };
  }
  
  return { isValid: true };
}

/**
 * Valida nome do usuário
 */
export function validateName(name: string): AuthValidationResult {
  if (!name) {
    return { isValid: false, error: 'Nome é obrigatório' };
  }
  
  if (name.length < 2) {
    return { isValid: false, error: 'Nome deve ter pelo menos 2 caracteres' };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: 'Nome muito longo' };
  }
  
  return { isValid: true };
}

/**
 * Valida telefone (formato brasileiro)
 */
export function validatePhone(phone: string): AuthValidationResult {
  if (!phone) {
    return { isValid: true }; // Telefone é opcional
  }
  
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Verifica se tem 10 ou 11 dígitos (com DDD)
  if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
    return { isValid: false, error: 'Telefone deve ter 10 ou 11 dígitos' };
  }
  
  return { isValid: true };
}

/**
 * Formata telefone brasileiro
 */
export function formatPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
}

/**
 * Verifica se email já está em uso
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    
    return !error && !!data;
  } catch {
    return false;
  }
}

/**
 * Gera senha temporária segura
 */
export function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
}

/**
 * Calcula força da senha (0-100)
 */
export function calculatePasswordStrength(password: string): number {
  let strength = 0;
  
  if (password.length >= 6) strength += 20;
  if (password.length >= 8) strength += 10;
  if (password.length >= 12) strength += 10;
  
  if (/[a-z]/.test(password)) strength += 10;
  if (/[A-Z]/.test(password)) strength += 10;
  if (/\d/.test(password)) strength += 10;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 20;
  
  if (/(.)\1{2,}/.test(password)) strength -= 10; // Penalizar repetições
  
  return Math.max(0, Math.min(100, strength));
}

/**
 * Obtém cor baseada na força da senha
 */
export function getPasswordStrengthColor(strength: number): string {
  if (strength < 30) return 'text-red-500';
  if (strength < 60) return 'text-yellow-500';
  if (strength < 80) return 'text-blue-500';
  return 'text-green-500';
}

/**
 * Obtém texto baseado na força da senha
 */
export function getPasswordStrengthText(strength: number): string {
  if (strength < 30) return 'Fraca';
  if (strength < 60) return 'Regular';
  if (strength < 80) return 'Boa';
  return 'Forte';
}

/**
 * Sanitiza dados do usuário para exibição
 */
export function sanitizeUserData(user: User): Partial<User> {
  const { id, name, email, points, level, total_spent, orders_count, preferences, created_at } = user;
  
  return {
    id,
    name,
    email,
    points,
    level,
    total_spent,
    orders_count,
    preferences,
    created_at
  };
}

/**
 * Verifica se usuário pode acessar funcionalidade baseada no nível
 */
export function canAccessFeature(userLevel: User['level'], requiredLevel: User['level']): boolean {
  const levels = ['bronze', 'silver', 'gold', 'diamond'];
  const userLevelIndex = levels.indexOf(userLevel);
  const requiredLevelIndex = levels.indexOf(requiredLevel);
  
  return userLevelIndex >= requiredLevelIndex;
}

/**
 * Obtém benefícios do nível do usuário
 */
export function getLevelBenefits(level: User['level']) {
  const benefits = {
    bronze: {
      discount: 0,
      freeDelivery: false,
      earlyAccess: false,
      pointsMultiplier: 1,
      maxCoupons: 1
    },
    silver: {
      discount: 5,
      freeDelivery: false,
      earlyAccess: false,
      pointsMultiplier: 1.1,
      maxCoupons: 2
    },
    gold: {
      discount: 10,
      freeDelivery: true,
      earlyAccess: false,
      pointsMultiplier: 1.2,
      maxCoupons: 3
    },
    diamond: {
      discount: 15,
      freeDelivery: true,
      earlyAccess: true,
      pointsMultiplier: 1.5,
      maxCoupons: 5
    }
  };
  
  return benefits[level];
}

/**
 * Calcula pontos necessários para próximo nível
 */
export function getPointsForNextLevel(currentLevel: User['level'], currentPoints: number): number {
  const levelThresholds = {
    bronze: 1000,
    silver: 3000,
    gold: 8000,
    diamond: Infinity
  };
  
  const nextLevel = {
    bronze: 'silver',
    silver: 'gold',
    gold: 'diamond',
    diamond: 'diamond'
  } as const;
  
  const nextLevelName = nextLevel[currentLevel];
  const pointsNeeded = levelThresholds[nextLevelName];
  
  return pointsNeeded === Infinity ? 0 : Math.max(0, pointsNeeded - currentPoints);
}

/**
 * Formata mensagens de erro de autenticação
 */
export function formatAuthError(error: string): string {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Email ou senha incorretos',
    'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
    'User not found': 'Usuário não encontrado',
    'Invalid email': 'Email inválido',
    'Password should be at least 6 characters': 'Senha deve ter pelo menos 6 caracteres',
    'User already registered': 'Este email já está cadastrado',
    'Signup requires a valid password': 'Senha inválida para cadastro',
    'Email rate limit exceeded': 'Muitas tentativas. Tente novamente em alguns minutos.',
    'Invalid refresh token': 'Sessão expirada. Faça login novamente.',
    'Token has expired': 'Token expirado. Solicite um novo link.',
    'Invalid token': 'Token inválido. Solicite um novo link.'
  };
  
  return errorMessages[error] || 'Erro desconhecido. Tente novamente.';
}