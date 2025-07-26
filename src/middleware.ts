import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Database } from '@/types/supabase';

// Rotas que requerem autenticação
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/orders',
  '/checkout',
  '/achievements',
  '/challenges',
  '/rewards'
];

// Rotas que só podem ser acessadas por usuários não autenticados
const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password'
];

// Rotas de API que requerem autenticação
const protectedApiRoutes = [
  '/api/user',
  '/api/orders',
  '/api/cart',
  '/api/achievements',
  '/api/challenges',
  '/api/points'
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Skip middleware if Supabase is not configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl === 'your_supabase_project_url' || 
      supabaseKey === 'your_supabase_anon_key' ||
      supabaseUrl === 'https://placeholder.supabase.co' ||
      supabaseKey === 'placeholder-key') {
    return res;
  }
  
  try {
    const supabase = createMiddlewareClient<Database>({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // Verificar se é uma rota de API protegida
  if (protectedApiRoutes.some(route => pathname.startsWith(route))) {
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Verificar se o usuário existe e está ativo
    const { data: user } = await supabase
      .from('users')
      .select('id, is_active')
      .eq('id', session.user.id)
      .single();

    if (!user || !user.is_active) {
      return NextResponse.json(
        { error: 'Usuário não encontrado ou inativo' },
        { status: 401 }
      );
    }

    return res;
  }

  // Verificar rotas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!session) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Verificar se o usuário existe e está ativo
    const { data: user } = await supabase
      .from('users')
      .select('id, is_active, email_verified')
      .eq('id', session.user.id)
      .single();

    if (!user || !user.is_active) {
      const redirectUrl = new URL('/auth/login', req.url);
      redirectUrl.searchParams.set('error', 'account_inactive');
      return NextResponse.redirect(redirectUrl);
    }

    // Verificar se o email foi verificado para certas rotas
    const requiresEmailVerification = ['/checkout', '/orders'];
    if (requiresEmailVerification.some(route => pathname.startsWith(route))) {
      if (!user.email_verified) {
        const redirectUrl = new URL('/auth/verify-email', req.url);
        redirectUrl.searchParams.set('redirectTo', pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }

    return res;
  }

  // Verificar rotas de autenticação (só para usuários não autenticados)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (session) {
      const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/dashboard';
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
    return res;
  }

  // Rota especial para verificação de email
  if (pathname === '/auth/verify-email') {
    if (session) {
      const { data: user } = await supabase
        .from('users')
        .select('email_verified')
        .eq('id', session.user.id)
        .single();

      if (user?.email_verified) {
        const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/dashboard';
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }
    }
    return res;
  }

  // Rota de callback de autenticação
  if (pathname === '/auth/callback') {
    const code = req.nextUrl.searchParams.get('code');
    
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (!error) {
        const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/dashboard';
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }
    }
    
    return NextResponse.redirect(new URL('/auth/login?error=callback_error', req.url));
  }

  return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - test pages
     */
    '/((?!_next/static|_next/image|favicon.ico|test-products|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};