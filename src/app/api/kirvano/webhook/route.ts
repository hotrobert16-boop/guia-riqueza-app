import { NextRequest, NextResponse } from 'next/server';
import { validateKirvanoWebhook, KirvanoPayment } from '@/lib/kirvano';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-kirvano-signature') || '';

    // Validar webhook da Kirvano
    if (!validateKirvanoWebhook(body, signature)) {
      return NextResponse.json(
        { error: 'Webhook inválido' },
        { status: 401 }
      );
    }

    const paymentData: KirvanoPayment = JSON.parse(body);

    // Processar diferentes tipos de eventos
    switch (paymentData.status) {
      case 'completed':
        // Pagamento aprovado - ativar acesso do usuário
        await activateUserAccess(paymentData.user_id, paymentData.plan);
        console.log(`Acesso ativado para usuário ${paymentData.user_id} - Plano: ${paymentData.plan}`);
        break;

      case 'failed':
        // Pagamento falhou - manter acesso gratuito
        await deactivateUserAccess(paymentData.user_id);
        console.log(`Pagamento falhou para usuário ${paymentData.user_id}`);
        break;

      case 'pending':
        // Pagamento pendente - aguardar confirmação
        console.log(`Pagamento pendente para usuário ${paymentData.user_id}`);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro no webhook Kirvano:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Função para ativar acesso do usuário
async function activateUserAccess(userId: string, plan: string) {
  // Aqui você salvaria no seu banco de dados que o usuário tem acesso
  // Por exemplo, usando Supabase, MongoDB, etc.
  
  // Exemplo com localStorage (apenas para demonstração)
  // Em produção, use um banco de dados real
  console.log(`Ativando acesso: Usuário ${userId} - Plano ${plan}`);
  
  // Implementar lógica de ativação:
  // 1. Salvar no banco de dados
  // 2. Enviar email de confirmação
  // 3. Atualizar cache se necessário
}

// Função para desativar acesso do usuário
async function deactivateUserAccess(userId: string) {
  console.log(`Desativando acesso: Usuário ${userId}`);
  
  // Implementar lógica de desativação:
  // 1. Remover do banco de dados
  // 2. Limpar cache
  // 3. Enviar notificação se necessário
}