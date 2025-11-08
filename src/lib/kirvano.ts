// Configuração da API Kirvano
export const KIRVANO_CONFIG = {
  // URL base da API Kirvano
  API_BASE_URL: process.env.KIRVANO_API_URL || 'https://api.kirvano.com',
  
  // Chave da API (deve ser configurada nas variáveis de ambiente)
  API_KEY: process.env.KIRVANO_API_KEY,
  
  // URLs de checkout para diferentes planos
  CHECKOUT_URLS: {
    premium: "https://pay.kirvano.com/37bf7c6e-84e3-47ad-b46c-83d6bfe3d87e",
    vip: "https://pay.kirvano.com/37bf7c6e-84e3-47ad-b46c-83d6bfe3d87e", // Mesmo link por enquanto
  },
  
  // Webhook secret para validar pagamentos
  WEBHOOK_SECRET: process.env.KIRVANO_WEBHOOK_SECRET,
};

// Tipos para integração Kirvano
export interface KirvanoUser {
  id: string;
  email: string;
  plan: 'free' | 'premium' | 'vip';
  subscription_status: 'active' | 'inactive' | 'cancelled';
  subscription_expires_at?: string;
}

export interface KirvanoPayment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// Função para verificar status de pagamento via API Kirvano
export async function checkUserSubscription(userId: string): Promise<KirvanoUser | null> {
  if (!KIRVANO_CONFIG.API_KEY) {
    console.warn('KIRVANO_API_KEY não configurada');
    return null;
  }

  try {
    const response = await fetch(`${KIRVANO_CONFIG.API_BASE_URL}/users/${userId}/subscription`, {
      headers: {
        'Authorization': `Bearer ${KIRVANO_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na API Kirvano: ${response.status}`);
    }

    const userData: KirvanoUser = await response.json();
    return userData;
  } catch (error) {
    console.error('Erro ao verificar assinatura Kirvano:', error);
    return null;
  }
}

// Função para validar webhook da Kirvano
export function validateKirvanoWebhook(payload: string, signature: string): boolean {
  if (!KIRVANO_CONFIG.WEBHOOK_SECRET) {
    console.warn('KIRVANO_WEBHOOK_SECRET não configurado');
    return false;
  }

  // Implementar validação de assinatura do webhook
  // Isso depende do método de assinatura usado pela Kirvano
  // Por exemplo, usando HMAC SHA256
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', KIRVANO_CONFIG.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  return signature === expectedSignature;
}