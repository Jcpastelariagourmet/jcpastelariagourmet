import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
    role?: string;
  };
}

/**
 * Middleware para autenticação em API routes
 * Verifica se o usuário está autenticado e adiciona dados do usuário à request
 */
export async function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const supabase = createRouteHandlerClient<Database>({ cookies });
      
      // Verificar sessão atual
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session?.user) {
        return NextResponse.json(
          { error: 'Não autorizado' },
          { status: 401 }
        );
      }

      // Verificar se o usuário existe na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email, is_active')
        .eq('id', session.user.id)
        .single();

      if (userError || !userData || !userData.is_active) {
        return NextResponse.json(
          { error: 'Usuário não encontrado ou inativo' },
          { status: 401 }
        );
      }

      // Adicionar dados do usuário à request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = {
        id: session.user.id,
        email: session.user.email!,
        role: session.user.user_metadata?.role || 'user'
      };

      return handler(authenticatedReq);
    } catch (error) {
      console.error('Erro no middleware de autenticação:', error);
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      );
    }
  };
}

/**
 * Middleware opcional para autenticação
 * Adiciona dados do usuário se autenticado, mas não bloqueia se não estiver
 */
export async function withOptionalAuth(
  handler: (req: NextRequest & { user?: AuthenticatedRequest['user'] }) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const supabase = createRouteHandlerClient<Database>({ cookies });
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('id, email, is_active')
          .eq('id', session.user.id)
          .single();

        if (userData && userData.is_active) {
          (req as any).user = {
            id: session.user.id,
            email: session.user.email!,
            role: session.user.user_metadata?.role || 'user'
          };
        }
      }

      return handler(req);
    } catch (error) {
      console.error('Erro no middleware de autenticação opcional:', error);
      return handler(req);
    }
  };
}

/**
 * Middleware para verificar role específica
 */
export function withRole(requiredRole: string) {
  return (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return withAuth(async (req: AuthenticatedRequest) => {
      if (req.user.role !== requiredRole) {
        return NextResponse.json(
          { error: 'Acesso negado' },
          { status: 403 }
        );
      }
      
      return handler(req);
    });
  };
}

/**
 * Utilitário para verificar autenticação em Server Components
 */
export async function getAuthenticatedUser() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session?.user) {
      return null;
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    return userData;
  } catch (error) {
    console.error('Erro ao verificar usuário autenticado:', error);
    return null;
  }
}

/**
 * Utilitário para verificar se usuário está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthenticatedUser();
  return !!user;
}