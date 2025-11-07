"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Crown, 
  Lock, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Target, 
  BookOpen, 
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Infinity,
  AlertCircle
} from "lucide-react";
import { checkUserSubscription, KIRVANO_CONFIG } from "@/lib/kirvano";

export default function GuiaDaRiqueza() {
  const [userPlan, setUserPlan] = useState<'free' | 'premium' | 'vip'>('free');
  const [isLoading, setIsLoading] = useState(true);
  const [paymentRequired, setPaymentRequired] = useState(false);

  useEffect(() => {
    // Verificar se usuário chegou via redirect de pagamento obrigatório
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_required') === 'true') {
      setPaymentRequired(true);
    }

    // Verificar status de assinatura do usuário
    checkUserAccess();
  }, []);

  const checkUserAccess = async () => {
    try {
      // Simular verificação de usuário
      // Em produção, você obteria o ID do usuário logado
      const userId = localStorage.getItem('user_id') || 'anonymous';
      
      const subscription = await checkUserSubscription(userId);
      
      if (subscription && subscription.subscription_status === 'active') {
        setUserPlan(subscription.plan);
      } else {
        setUserPlan('free');
      }
    } catch (error) {
      console.error('Erro ao verificar acesso:', error);
      setUserPlan('free');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKirvanoCheckout = (plan: 'premium' | 'vip') => {
    // Salvar tentativa de compra
    localStorage.setItem('attempted_plan', plan);
    
    // Redirecionar para checkout da Kirvano
    const checkoutUrl = KIRVANO_CONFIG.CHECKOUT_URLS[plan];
    window.open(checkoutUrl, '_blank');
  };

  const freeContent = [
    "Introdução aos Investimentos",
    "Conceitos Básicos de Renda Fixa",
    "Como Começar a Investir"
  ];

  const premiumContent = [
    "Estratégias Avançadas de Investimento",
    "Análise de Ações e FIIs",
    "Diversificação de Portfólio",
    "Planejamento Financeiro Pessoal",
    "Investimentos Internacionais",
    "Criptomoedas e Ativos Digitais"
  ];

  const vipContent = [
    "Consultoria Personalizada 1:1",
    "Análises Exclusivas de Mercado",
    "Grupo VIP no Telegram",
    "Webinars Ao Vivo Semanais",
    "Planilhas Profissionais",
    "Suporte Prioritário 24/7"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando seu acesso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Alerta de Pagamento Obrigatório */}
      {paymentRequired && (
        <div className="bg-red-900/50 border-b border-red-700 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-2 text-red-200">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Acesso Restrito: Pagamento necessário para continuar</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Guia da Riqueza</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={userPlan === 'free' ? 'secondary' : userPlan === 'premium' ? 'default' : 'destructive'}>
                {userPlan === 'free' ? 'Gratuito' : userPlan === 'premium' ? 'Premium' : 'VIP'}
              </Badge>
              {userPlan !== 'free' && <Crown className="w-5 h-5 text-yellow-400" />}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Transforme Sua
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {" "}Vida Financeira
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubra os segredos dos milionários e construa sua riqueza com estratégias comprovadas. 
              Mais de 50.000 pessoas já transformaram suas vidas financeiras conosco.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Métodos Comprovados</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Resultados Garantidos</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg">Suporte Especializado</span>
            </div>
          </div>

          {userPlan === 'free' && (
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => handleKirvanoCheckout('premium')}
            >
              Começar Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Escolha Seu Plano</h3>
            <p className="text-xl text-gray-300">Acelere sua jornada rumo à independência financeira</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Gratuito */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-300" />
                </div>
                <CardTitle className="text-2xl text-white">Gratuito</CardTitle>
                <CardDescription className="text-gray-400">Para começar sua jornada</CardDescription>
                <div className="text-3xl font-bold text-white mt-4">R$ 0<span className="text-lg text-gray-400">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {freeContent.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={userPlan === 'free'}
                >
                  {userPlan === 'free' ? 'Plano Atual' : 'Downgrade'}
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="bg-gradient-to-b from-purple-900/50 to-blue-900/50 border-purple-500 backdrop-blur-sm relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1">
                  Mais Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Premium</CardTitle>
                <CardDescription className="text-gray-300">Para investidores sérios</CardDescription>
                <div className="text-3xl font-bold text-white mt-4">R$ 97<span className="text-lg text-gray-400">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[...freeContent, ...premiumContent].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold"
                  onClick={() => handleKirvanoCheckout('premium')}
                  disabled={userPlan === 'premium'}
                >
                  {userPlan === 'premium' ? 'Plano Atual' : 'Assinar Premium'} <Zap className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Plano VIP */}
            <Card className="bg-gradient-to-b from-yellow-900/50 to-orange-900/50 border-yellow-500 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">VIP</CardTitle>
                <CardDescription className="text-gray-300">Para milionários em formação</CardDescription>
                <div className="text-3xl font-bold text-white mt-4">R$ 297<span className="text-lg text-gray-400">/mês</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {[...freeContent, ...premiumContent, ...vipContent].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
                  onClick={() => handleKirvanoCheckout('vip')}
                  disabled={userPlan === 'vip'}
                >
                  {userPlan === 'vip' ? 'Plano Atual' : 'Assinar VIP'} <Crown className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Conteúdo com Acesso Limitado */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Conteúdo Exclusivo</h3>
            <p className="text-xl text-gray-300">Acesso baseado no seu plano atual</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Conteúdo Gratuito */}
            {freeContent.map((item, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{item}</CardTitle>
                    <Badge variant="secondary">Gratuito</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Conteúdo introdutório disponível para todos os usuários.</p>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                    Acessar Conteúdo
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Conteúdo Premium */}
            {premiumContent.map((item, index) => (
              <Card key={index} className={`${userPlan === 'free' ? 'bg-gray-900/30 border-gray-800' : 'bg-purple-900/30 border-purple-700'} backdrop-blur-sm relative`}>
                {userPlan === 'free' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 font-semibold">Premium Necessário</p>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-lg ${userPlan === 'free' ? 'text-gray-500' : 'text-white'}`}>{item}</CardTitle>
                    <Badge variant={userPlan === 'free' ? 'secondary' : 'default'}>Premium</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`${userPlan === 'free' ? 'text-gray-500' : 'text-gray-300'} mb-4`}>
                    Estratégias avançadas para maximizar seus investimentos.
                  </p>
                  {userPlan === 'free' ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      onClick={() => handleKirvanoCheckout('premium')}
                    >
                      Desbloquear Premium
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full border-purple-600 text-purple-300">
                      Acessar Conteúdo
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Conteúdo VIP */}
            {vipContent.map((item, index) => (
              <Card key={index} className={`${userPlan !== 'vip' ? 'bg-gray-900/30 border-gray-800' : 'bg-yellow-900/30 border-yellow-700'} backdrop-blur-sm relative`}>
                {userPlan !== 'vip' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Crown className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 font-semibold">VIP Necessário</p>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-lg ${userPlan !== 'vip' ? 'text-gray-500' : 'text-white'}`}>{item}</CardTitle>
                    <Badge variant={userPlan !== 'vip' ? 'secondary' : 'destructive'}>VIP</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`${userPlan !== 'vip' ? 'text-gray-500' : 'text-gray-300'} mb-4`}>
                    Acesso exclusivo e consultoria personalizada.
                  </p>
                  {userPlan !== 'vip' ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
                      onClick={() => handleKirvanoCheckout('vip')}
                    >
                      Desbloquear VIP
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full border-yellow-600 text-yellow-300">
                      Acessar Conteúdo
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      {userPlan === 'free' && (
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-bold text-white mb-6">Pronto Para Mudar Sua Vida?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já transformaram suas vidas financeiras com nosso método comprovado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold text-lg px-8 py-4"
                onClick={() => handleKirvanoCheckout('premium')}
              >
                Começar Premium <Star className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg px-8 py-4"
                onClick={() => handleKirvanoCheckout('vip')}
              >
                Ir Direto para VIP <Crown className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black/40 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Guia da Riqueza</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 Guia da Riqueza. Todos os direitos reservados.</p>
              <p className="text-sm mt-1">Powered by Kirvano</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}