import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth-middleware';
import { supabase } from '@/lib/supabase';

export const POST = withAuth(async (req) => {
  try {
    // Reenviar email de verificação
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: req.user.email
    });

    if (error) {
      return NextResponse.json(
        { error: 'Erro ao reenviar email de verificação' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      message: 'Email de verificação reenviado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao reenviar email de verificação:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
});

export const GET = withAuth(async (req) => {
  try {
    // Verificar status de verificação do email
    const { data: user, error } = await supabase
      .from('users')
      .select('email_verified')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      email_verified: user.email_verified 
    });
  } catch (error) {
    console.error('Erro ao verificar status do email:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
});