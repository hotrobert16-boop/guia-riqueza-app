import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simulação de verificação de pagamento Kirvano
// Em produção, isso seria uma chamada para API da Kirvano
async function checkKirvanoPayment(userId: string): Promise<boolean> {
  // Aqui você faria uma chamada real para a API da Kirvano
  // Por enquanto, retorna false para simular usuário não pagante
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rotas que requerem pagamento
  const protectedRoutes = ['/premium', '/vip', '/content'];
  
  // Verificar se a rota atual é protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (isProtectedRoute) {
    // Verificar se usuário tem acesso pago via Kirvano
    const userId = request.cookies.get('user_id')?.value || 'anonymous';
    const hasPaidAccess = await checkKirvanoPayment(userId);
    
    if (!hasPaidAccess) {
      // Redirecionar para página de pagamento
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('payment_required', 'true');
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};