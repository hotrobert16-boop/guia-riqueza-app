"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PremiumGuard } from "@/components/PremiumGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  LogOut, 
  User, 
  BookOpen, 
  TrendingUp, 
  Target, 
  Award,
  PlayCircle,
  CheckCircle,
  Clock,
  DollarSign,
  PieChart,
  BarChart3,
  Lightbulb,
  Download,
  Users,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  category: 'basic' | 'intermediate' | 'advanced';
  premium: boolean;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Fundamentos dos Investimentos',
    description: 'Aprenda os conceitos básicos para começar a investir',
    duration: '15 min',
    completed: true,
    category: 'basic',
    premium: false
  },
  {
    id: '2',
    title: 'Renda Fixa vs Renda Variável',
    description: 'Entenda as diferenças e quando usar cada tipo',
    duration: '20 min',
    completed: true,
    category: 'basic',
    premium: false
  },
  {
    id: '3',
    title: 'Análise Fundamentalista',
    description: 'Como analisar empresas antes de investir',
    duration: '45 min',
    completed: false,
    category: 'intermediate',
    premium: true
  },
  {
    id: '4',
    title: 'Diversificação de Portfólio',
    description: 'Estratégias para reduzir riscos e maximizar retornos',
    duration: '30 min',
    completed: false,
    category: 'intermediate',
    premium: true
  },
  {
    id: '5',
    title: 'Investimentos Internacionais',
    description: 'Como investir no exterior e proteger seu patrimônio',
    duration: '35 min',
    completed: false,
    category: 'advanced',
    premium: true
  },
  {
    id: '6',
    title: 'Criptomoedas e DeFi',
    description: 'O futuro das finanças descentralizadas',
    duration: '40 min',
    completed: false,
    category: 'advanced',
    premium: true
  }
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [completedLessons, setCompletedLessons] = useState(0);

  useEffect(() => {
    const completed = lessons.filter(lesson => lesson.completed).length;
    setCompletedLessons(completed);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const progressPercentage = (completedLessons / lessons.length) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'basic': return 'Básico';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 text-sm">Bem-vindo de volta, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={user?.isPremium ? 'default' : 'secondary'} className="flex items-center space-x-1">
                {user?.isPremium && <Crown className="w-4 h-4" />}
                <span>{user?.isPremium ? 'Premium' : 'Gratuito'}</span>
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 border-gray-700 backdrop-blur-sm mb-6">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-white">{user?.name}</CardTitle>
                <CardDescription className="text-gray-400">{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progresso Geral</span>
                      <span className="text-white">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{completedLessons}</div>
                      <div className="text-xs text-gray-400">Concluídas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{lessons.length - completedLessons}</div>
                      <div className="text-xs text-gray-400">Restantes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-green-400" />
                    <div>
                      <div className="text-lg font-bold text-white">+12.5%</div>
                      <div className="text-xs text-green-400">Retorno Médio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-700 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-lg font-bold text-white">85%</div>
                      <div className="text-xs text-blue-400">Meta Atingida</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="lessons" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700 mb-8">
                <TabsTrigger value="lessons" className="text-gray-300 data-[state=active]:text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Aulas
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="text-gray-300 data-[state=active]:text-white">
                  <PieChart className="w-4 h-4 mr-2" />
                  Portfólio
                </TabsTrigger>
                <TabsTrigger value="tools" className="text-gray-300 data-[state=active]:text-white">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ferramentas
                </TabsTrigger>
                <TabsTrigger value="community" className="text-gray-300 data-[state=active]:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Comunidade
                </TabsTrigger>
              </TabsList>

              {/* Lessons Tab */}
              <TabsContent value="lessons" className="space-y-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="border-gray-600"
                  >
                    Todas
                  </Button>
                  <Button
                    variant={selectedCategory === 'basic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('basic')}
                    className="border-gray-600"
                  >
                    Básico
                  </Button>
                  <Button
                    variant={selectedCategory === 'intermediate' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('intermediate')}
                    className="border-gray-600"
                  >
                    Intermediário
                  </Button>
                  <Button
                    variant={selectedCategory === 'advanced' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('advanced')}
                    className="border-gray-600"
                  >
                    Avançado
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredLessons.map((lesson) => (
                    <PremiumGuard key={lesson.id} requireLogin={false}>
                      <Card className={`${lesson.premium && !user?.isPremium 
                        ? 'bg-gray-900/30 border-gray-800' 
                        : 'bg-black/40 border-gray-700'} backdrop-blur-sm hover:border-purple-500 transition-colors`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className={`w-2 h-2 rounded-full ${getCategoryColor(lesson.category)}`} />
                                <Badge variant="secondary" className="text-xs">
                                  {getCategoryLabel(lesson.category)}
                                </Badge>
                                {lesson.premium && (
                                  <Badge variant="default" className="text-xs">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className={`text-lg ${lesson.premium && !user?.isPremium ? 'text-gray-500' : 'text-white'}`}>
                                {lesson.title}
                              </CardTitle>
                              <CardDescription className={lesson.premium && !user?.isPremium ? 'text-gray-600' : 'text-gray-400'}>
                                {lesson.description}
                              </CardDescription>
                            </div>
                            {lesson.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                            ) : (
                              <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.duration}</span>
                            </div>
                            <Button
                              size="sm"
                              disabled={lesson.premium && !user?.isPremium}
                              className={lesson.completed 
                                ? "bg-green-600 hover:bg-green-700" 
                                : "bg-purple-600 hover:bg-purple-700"}
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              {lesson.completed ? 'Revisar' : 'Assistir'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </PremiumGuard>
                  ))}
                </div>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                <PremiumGuard>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                          Patrimônio Total
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white mb-2">R$ 125.430</div>
                        <div className="text-green-400 text-sm">+8.5% este mês</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                          Rentabilidade
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white mb-2">+12.8%</div>
                        <div className="text-blue-400 text-sm">Últimos 12 meses</div>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Target className="w-5 h-5 mr-2 text-yellow-400" />
                          Meta Anual
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-white mb-2">85%</div>
                        <div className="text-yellow-400 text-sm">R$ 150.000</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Distribuição de Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Ações</span>
                          <span className="text-white">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Renda Fixa</span>
                          <span className="text-white">30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">FIIs</span>
                          <span className="text-white">15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Internacional</span>
                          <span className="text-white">10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </PremiumGuard>
              </TabsContent>

              {/* Tools Tab */}
              <TabsContent value="tools" className="space-y-6">
                <PremiumGuard>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                          Calculadora de Juros Compostos
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Simule o crescimento dos seus investimentos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Abrir Calculadora
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Download className="w-5 h-5 mr-2 text-green-400" />
                          Planilhas Premium
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Controle completo dos seus investimentos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar Planilhas
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <PieChart className="w-5 h-5 mr-2 text-blue-400" />
                          Análise de Portfólio
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Otimize sua carteira de investimentos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analisar Portfólio
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-400" />
                          Relatórios Personalizados
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Relatórios detalhados dos seus investimentos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black">
                          <Award className="w-4 h-4 mr-2" />
                          Gerar Relatório
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </PremiumGuard>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-6">
                <PremiumGuard>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                          Grupo VIP Telegram
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Discussões exclusivas e análises em tempo real
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Entrar no Grupo
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Users className="w-5 h-5 mr-2 text-green-400" />
                          Webinars Ao Vivo
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          Sessões semanais com especialistas
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-400 mb-4">
                          Próximo webinar: Quinta, 19h
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Users className="w-4 h-4 mr-2" />
                          Participar
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-black/40 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Últimas Discussões</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                          <h4 className="text-white font-semibold">Análise: PETR4 vs VALE3</h4>
                          <p className="text-gray-400 text-sm">Discussão sobre as perspectivas das duas gigantes...</p>
                          <div className="text-xs text-gray-500 mt-2">2 horas atrás • 24 comentários</div>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="text-white font-semibold">Estratégia para 2024</h4>
                          <p className="text-gray-400 text-sm">Como posicionar o portfólio para o próximo ano...</p>
                          <div className="text-xs text-gray-500 mt-2">5 horas atrás • 18 comentários</div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="text-white font-semibold">Dica: Tesouro IPCA+</h4>
                          <p className="text-gray-400 text-sm">Momento ideal para aportar em títulos indexados...</p>
                          <div className="text-xs text-gray-500 mt-2">1 dia atrás • 31 comentários</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </PremiumGuard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}