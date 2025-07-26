'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AuthRedirectProps {
  to: string;
  condition: 'authenticated' | 'unauthenticated';
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente para redirecionamento baseado em estado de autenticação
 */
export function AuthRedirect({ 
  to, 
  condition, 
  children, 
  fallback 
}: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const shouldRedirect = 
        (condition === 'authenticated' && isAuthenticated) ||
        (condition === 'unauthenticated' && !isAuthenticated);

      if (shouldRedirect) {
        router.push(to);
      }
    }
  }, [isAuthenticated, isLoading, condition, to, router]);

  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const shouldShow = 
    (condition === 'authenticated' && !isAuthenticated) ||
    (condition === 'unauthenticated' && isAuthenticated);

  return shouldShow ? <>{children}</> : null;
}

/**
 * HOC para proteger rotas que requerem autenticação
 */
export function withAuthRequired<P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = '/auth/login'
) {
  return function AuthRequiredComponent(props: P) {
    return (
      <AuthRedirect condition="unauthenticated" to={redirectTo}>
        <Component {...props} />
      </AuthRedirect>
    );
  };
}

/**
 * HOC para proteger rotas que requerem usuário não autenticado
 */
export function withGuestRequired<P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = '/dashboard'
) {
  return function GuestRequiredComponent(props: P) {
    return (
      <AuthRedirect condition="authenticated" to={redirectTo}>
        <Component {...props} />
      </AuthRedirect>
    );
  };
}