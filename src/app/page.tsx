"use client";
import React, { useState, useEffect } from 'react';
import { Home, Camera, User, TrendingUp, BookOpen, Plus, Mail, Lock, Trophy, Flame, Crown, Zap, Bell, ChevronLeft, Settings, X, Moon, Sun, Share2, History, Users, Trash2, Clock } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function DumboFitApp() {
  const [screen, setScreen] = useState('welcome');
  const [tab, setTab] = useState('home');
  const [showCamera, setShowCamera] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showRecipeGen, setShowRecipeGen] = useState(false);
  const [genRecipe, setGenRecipe] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [dark, setDark] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [water, setWater] = useState(1.2);
  const [recipe, setRecipe] = useState<any | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    dietRestrictions: [],
    mealsPerDay: '',
    wakeUpTime: '',
    bedTime: ''
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setScreen('quiz');
        setQuizStep(0);
      }
      if (event === 'SIGNED_OUT') {
        setScreen('welcome');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);


  const KEY = 'YOUR_API_KEY'; // Substitua pela sua chave de API do Google AI
  
  const user = { 
    name: quizData.name || 'Ana Silva', 
    level: 12, 
    xp: 2450, 
    nextXp: 3000, 
    streak: 15, 
    weight: parseInt(quizData.weight) || 55, 
    height: parseInt(quizData.height) || 165,
    age: parseInt(quizData.age) || 28,
    goal: quizData.goal || 'improve_health',
    cal: 1247, 
    goal_calories: quizData.goal === 'lose_weight' ? 1800 : quizData.goal === 'gain_muscle' ? 2200 : 2000,
    date: 'Jan 2024', 
    meals: 245, 
    friends: 48, 
    badges: 12 
  };
  
  const objs = [
    { id: 'loss', name: 'Perda Peso', emoji: '⬇️', desc: 'Baixas calorias' },
    { id: 'gain', name: 'Ganho Massa', emoji: '💪', desc: 'Alto proteico' },
    { id: 'energy', name: 'Energia', emoji: '⚡', desc: 'Carboidratos' },
    { id: 'detox', name: 'Detox', emoji: '🌿', desc: 'Antioxidantes' },
    { id: 'heart', name: 'Cardíaca', emoji: '❤️', desc: 'Ômega-3' },
    { id: 'immune', name: 'Imunidade', emoji: '🛡️', desc: 'Vitamina C' }
  ];
  
  const challenge = { 
    title: 'Desafio Semana', 
    desc: '5 refeições balanceadas', 
    prog: 3, 
    total: 5, 
    reward: 200, 
    icon: '🏅' 
  };

  const quizSteps = [
    {
      id: 'name',
      title: 'Vamos nos conhecer!',
      subtitle: 'Como você gostaria de ser chamado?',
      type: 'text',
      placeholder: 'Digite seu primeiro nome',
      icon: '👋'
    },
    {
      id: 'age',
      title: 'Qual sua idade?',
      subtitle: 'Isso nos ajuda a personalizar suas metas',
      type: 'number',
      placeholder: 'Ex: 28',
      icon: '🎂'
    },
    {
      id: 'gender',
      title: 'Gênero',
      subtitle: 'Para calcularmos suas necessidades nutricionais',
      type: 'select',
      options: [
        { value: 'female', label: 'Feminino', icon: '♀️' },
        { value: 'male', label: 'Masculino', icon: '♂️' },
        { value: 'other', label: 'Prefiro não informar', icon: '⚧️' }
      ],
      icon: '👤'
    },
    {
      id: 'height',
      title: 'Sua altura',
      subtitle: 'Em centímetros',
      type: 'number',
      placeholder: 'Ex: 170',
      icon: '📏'
    },
    {
      id: 'weight',
      title: 'Peso atual',
      subtitle: 'Em quilogramas (manteremos privado)',
      type: 'number',
      placeholder: 'Ex: 65',
      icon: '⚖️'
    },
    {
      id: 'goal',
      title: 'Qual seu objetivo principal?',
      subtitle: 'Vamos focar no que é mais importante para você',
      type: 'select',
      options: [
        { value: 'lose_weight', label: 'Perder peso', icon: '⬇️' },
        { value: 'gain_muscle', label: 'Ganhar massa muscular', icon: '💪' },
        { value: 'maintain', label: 'Manter peso atual', icon: '⚖️' },
        { value: 'improve_health', label: 'Melhorar saúde geral', icon: '❤️' },
        { value: 'increase_energy', label: 'Aumentar energia', icon: '⚡' }
      ],
      icon: '🎯'
    }
  ];

  useEffect(() => {
    setHistory([
      { id: 1, name: 'Salada Caesar Frango', cal: 420, prot: 28, date: new Date(Date.now() - 86400000).toLocaleDateString('pt-BR'), time: '12:30', photo: '🥗' },
      { id: 2, name: 'Smoothie Frutas', cal: 180, prot: 8, date: new Date(Date.now() - 172800000).toLocaleDateString('pt-BR'), time: '09:15', photo: '🥤' },
      { id: 3, name: 'Salmão Legumes', cal: 520, prot: 35, date: new Date(Date.now() - 259200000).toLocaleDateString('pt-BR'), time: '19:45', photo: '🐟' }
    ]);
  }, []);

  const genRecipeAI = async (obj: string) => {
    const o = objs.find(x => x.id === obj);
    const prompt = `Crie receita brasileira para ${o?.name}. Retorne JSON: {"name":"Nome da receita","calories":300,"time":25,"difficulty":"Fácil","servings":2,"ingredients":["ingrediente 1","ingrediente 2"],"instructions":["passo 1","passo 2"],"tips":"dica especial"}`;
    
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: prompt }] }], 
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 } 
        })
      });
      
      const data = await res.json();
      let txt = data.candidates[0].content.parts[0].text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const match = txt.match(/\{[\s\S]*\}/);
      
      if (match) {
        const r = JSON.parse(match[0]);
        return { ...r, id: Date.now(), obj, emoji: '🍽️' };
      }
    } catch (e) { console.error(e); }
    
    return { 
      id: Date.now(), 
      name: `Receita ${o?.name}`, 
      calories: 280, 
      time: 20, 
      difficulty: 'Fácil', 
      servings: 2, 
      obj, 
      emoji: '🍽️', 
      ingredients: ['Ingredientes saudáveis', 'Temperos naturais'], 
      instructions: ['Prepare os ingredientes', 'Cozinhe com carinho'], 
      tips: 'Receita especial criada para você!' 
    };
  };

  const handleGen = async (obj: string) => {
    setGenRecipe(true);
    setShowRecipeGen(false);
    const r = await genRecipeAI(obj);
    setRecipes((p: any[]) => [r, ...p]);
    setGenRecipe(false);
  };

  const handleQuizNext = () => {
    if (quizStep < quizSteps.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setScreen('welcome_personal');
    }
  };

  const handleQuizBack = () => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    }
  };

  const updateQuizData = (field: string, value: any) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepComplete = (step: number) => {
    const stepData = quizSteps[step];
    const value = quizData[stepData.id as keyof typeof quizData];
    return value && value.toString().trim() !== '';
  };

  const handleCapture = async () => {
    setShowCamera(false);
    setShowAnalysis(true);
    await new Promise(r => setTimeout(r, 3000));
    
    const m = { 
      id: Date.now(), 
      name: 'Salada Caesar', 
      cal: 420, 
      prot: 28, 
      date: new Date().toLocaleDateString('pt-BR'), 
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), 
      photo: '🥗' 
    };
    
    setHistory((p: any[]) => [m, ...p]);
    setShowAnalysis(false);
    setShowReward(true);
  };

  const bg = dark ? 'bg-gray-900' : 'bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50';
  const card = dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const txt = dark ? 'text-gray-100' : 'text-gray-900';
  const txt2 = dark ? 'text-gray-400' : 'text-gray-600';

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full text-center text-white">
            <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/20 shadow-2xl animate-bounce">
              <span className="text-5xl">🐘</span>
            </div>
            <h1 className="text-4xl font-black mb-3">Dumbo Fit</h1>
            <p className="text-lg text-blue-100 mb-12">Transforme sua alimentação com IA</p>
            <div className="space-y-4">
              <button 
                onClick={() => setScreen('auth')} 
                className="w-full bg-white text-purple-600 py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-all"
              >
                Começar Jornada
              </button>
              <button 
                onClick={() => setScreen('auth')} 
                className="w-full border-2 border-white/30 text-white py-5 px-8 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                Já tenho conta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button 
            onClick={() => setScreen('welcome')} 
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Voltar
          </button>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-3xl">🐘</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Bem-vindo!</h2>
            <p className="text-gray-600 text-lg">Crie sua conta ou entre para continuar</p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="light"
            localization={{
              variables: {
                sign_up: {
                  email_label: 'Seu melhor e-mail',
                  password_label: 'Crie uma senha forte',
                  button_label: 'Criar minha conta',
                  loading_button_label: 'Criando conta...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Não tem uma conta? Crie uma agora',
                },
                sign_in: {
                  email_label: 'Seu e-mail',
                  password_label: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                forgotten_password: {
                  email_label: 'Seu e-mail',
                  password_label: 'Sua senha',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando...',
                  link_text: 'Esqueceu sua senha?',
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  if (screen === 'quiz') {
    const currentStep = quizSteps[quizStep];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
        <div className="px-4 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={handleQuizBack} 
              className={`p-3 rounded-xl ${quizStep === 0 ? 'opacity-50' : 'hover:bg-gray-100'} transition-colors`}
              disabled={quizStep === 0}
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-gray-600 font-medium">Passo {quizStep + 1} de {quizSteps.length}</p>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((quizStep + 1) / quizSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-12"></div>
          </div>
        </div>

        <div className="flex-1 px-4 pb-24">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-4xl">{currentStep.icon}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-3">{currentStep.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{currentStep.subtitle}</p>
            </div>

            <div className="space-y-4 mb-8">
              {currentStep.type === 'text' && (
                <input
                  type="text"
                  placeholder={currentStep.placeholder}
                  value={quizData[currentStep.id as keyof typeof quizData] || ''}
                  onChange={(e) => updateQuizData(currentStep.id, e.target.value)}
                  className="w-full px-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all"
                />
              )}

              {currentStep.type === 'number' && (
                <input
                  type="number"
                  placeholder={currentStep.placeholder}
                  value={quizData[currentStep.id as keyof typeof quizData] || ''}
                  onChange={(e) => updateQuizData(currentStep.id, e.target.value)}
                  className="w-full px-6 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg font-medium transition-all"
                />
              )}

              {currentStep.type === 'select' && currentStep.options && (
                <div className="space-y-3">
                  {currentStep.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateQuizData(currentStep.id, option.value)}
                      className={`w-full p-5 rounded-2xl border-2 transition-all ${
                        quizData[currentStep.id as keyof typeof quizData] === option.value
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg'
                          : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">{option.icon}</span>
                        <div className="text-left">
                          <p className="font-bold text-lg">{option.label}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-8">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleQuizNext}
              disabled={!isStepComplete(quizStep)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {quizStep === quizSteps.length - 1 ? 'Finalizar e Começar!' : 'Próximo'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'welcome_personal') {
    const calorieGoal = quizData.goal === 'lose_weight' ? 1800 : quizData.goal === 'gain_muscle' ? 2200 : 2000;
    const imc = quizData.weight && quizData.height ? (parseInt(quizData.weight) / ((parseInt(quizData.height)/100) ** 2)).toFixed(1) : '0.0';

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10 flex flex-col min-h-screen p-4">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md w-full text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/20 shadow-2xl animate-bounce">
                <span className="text-5xl">🎉</span>
              </div>
              
              <h1 className="text-3xl font-black mb-3">
                Perfeito, {quizData.name}!
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                Criamos um plano personalizado para você
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/20">
                <h2 className="text-xl font-bold mb-4">Seu Perfil Dumbo Fit</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-blue-200 text-sm">Meta Calórica</p>
                    <p className="font-black text-2xl">{calorieGoal}</p>
                    <p className="text-blue-200 text-xs">calorias/dia</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-blue-200 text-sm">IMC</p>
                    <p className="font-black text-2xl">{imc}</p>
                    <p className="text-blue-200 text-xs">índice</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-emerald-300/20">
                <h3 className="font-bold text-lg mb-3">Recomendações para Você</h3>
                <div className="space-y-2 text-left">
                  <p className="text-emerald-100 text-sm">• Receitas IA baseadas no seu perfil</p>
                  <p className="text-emerald-100 text-sm">• Metas calóricas personalizadas</p>
                  <p className="text-emerald-100 text-sm">• Acompanhamento de progresso</p>
                </div>
              </div>

              <button 
                onClick={() => { setScreen('app'); setTab('home'); }} 
                className="w-full bg-gradient-to-r from-white to-blue-50 text-purple-600 py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-all mb-4"
              >
                Começar Minha Jornada!
              </button>
              
              <p className="text-blue-200 text-sm">
                Seus dados estão seguros e você pode ajustá-los a qualquer momento
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showAnalysis) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-purple-900 z-50 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-bold mb-4">Analisando refeição...</h2>
          <div className="space-y-2 text-blue-200">
            <p>🔍 Identificando ingredientes...</p>
            <p>🧮 Calculando nutrição...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showReward) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-900 to-emerald-900 z-50 flex items-center justify-center text-white p-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Trophy size={64} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Parabéns!</h2>
          <p className="text-xl mb-6">Você ganhou +50 XP!</p>
          <button 
            onClick={() => { setShowReward(false); setTab('home'); }} 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-64 border-4 border-white border-dashed rounded-2xl flex items-center justify-center mb-8 animate-pulse">
              <div>
                <Camera size={64} className="text-white mx-auto mb-4 animate-bounce" />
                <p className="text-white text-lg">Posicione o prato</p>
              </div>
            </div>
            <button 
              onClick={handleCapture} 
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all mx-auto mb-4"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>
            </button>
          </div>
        </div>
        <button 
          onClick={() => setShowCamera(false)} 
          className="absolute top-4 left-4 text-white p-3 hover:bg-white/10 rounded-full transition-all"
        >
          <X size={24} />
        </button>
      </div>
    );
  }

  if (genRecipe) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-pink-900 z-50 flex items-center justify-center text-white p-4">
        <div className="text-center">
          <div className="flex justify-center gap-3 mb-8">
            <div className="text-6xl animate-bounce">🐘</div>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>👨‍🍳</div>
          </div>
          <div className="w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin mb-8 mx-auto"></div>
          <h2 className="text-3xl font-bold mb-4">Dumbo Chefe criando...</h2>
          <p className="text-purple-200">✨ Preparando uma receita especial para você</p>
        </div>
      </div>
    );
  }

  if (showRecipeGen) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
        <div className={`w-full ${card} rounded-t-3xl p-6 animate-slide-up`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🐘👨‍🍳</span>
              <div>
                <h2 className={`text-2xl font-black ${txt}`}>Dumbo Chefe</h2>
                <p className={`text-sm ${txt2}`}>Seu chef pessoal com IA</p>
              </div>
            </div>
            <button onClick={() => setShowRecipeGen(false)} className={`p-2 ${txt2} hover:bg-gray-100 rounded-full transition-all`}>
              <X size={24} />
            </button>
          </div>
          <p className={`${txt2} mb-6`}>Escolha seu objetivo nutricional</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {objs.map(o => (
              <button 
                key={o.id} 
                onClick={() => handleGen(o.id)} 
                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-5 rounded-2xl hover:scale-105 transition-all shadow-lg"
              >
                <div className="text-3xl mb-2">{o.emoji}</div>
                <p className="font-bold text-sm mb-1">{o.name}</p>
                <p className="text-xs text-blue-100">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recipe) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className={`min-h-screen ${bg} p-4`}>
          <div className="max-w-2xl mx-auto py-6">
            <button 
              onClick={() => setRecipe(null)} 
              className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Voltar
            </button>
            
            <div className={`${card} rounded-3xl p-6 shadow-xl mb-4`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className={`text-3xl font-black ${txt} mb-2`}>{recipe.name}</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {recipe.calories} cal
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {recipe.time} min
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {recipe.difficulty}
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {recipe.servings} porções
                    </span>
                  </div>
                </div>
                <div className="text-5xl ml-4">{recipe.emoji}</div>
              </div>
              
              {recipe.tips && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">💡 <strong>Dica:</strong> {recipe.tips}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className={`text-xl font-bold ${txt} mb-3 flex items-center`}>
                  <span className="mr-2">🛒</span> Ingredientes
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing: string, i: number) => (
                    <li key={i} className={`${txt2} flex items-start`}>
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className={`text-xl font-bold ${txt} mb-3 flex items-center`}>
                  <span className="mr-2">👨‍🍳</span> Modo de Preparo
                </h2>
                <ol className="space-y-3">
                  {recipe.instructions.map((step: string, i: number) => (
                    <li key={i} className={`${txt2} flex items-start`}>
                      <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">
                Salvar Receita
              </button>
              <button className="bg-white text-gray-700 p-4 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showHistory) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className={`min-h-screen ${bg} p-4`}>
          <div className="max-w-2xl mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowHistory(false)} 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" />
                Voltar
              </button>
              <h1 className={`text-2xl font-black ${txt}`}>Histórico</h1>
              <div className="w-16"></div>
            </div>
            
            <div className="space-y-3">
              {history.map(item => (
                <div key={item.id} className={`${card} rounded-2xl p-4 shadow-md hover:shadow-lg transition-all`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl">
                      {item.photo}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${txt} mb-1`}>{item.name}</h3>
                      <p className={`text-sm ${txt2}`}>{item.date} • {item.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-bold text-lg">{item.cal}</p>
                      <p className="text-xs text-gray-500">calorias</p>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className={`min-h-screen ${bg} p-4`}>
          <div className="max-w-2xl mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowSettings(false)} 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft size={20} className="mr-1" />
                Voltar
              </button>
              <h1 className={`text-2xl font-black ${txt}`}>Configurações</h1>
              <div className="w-16"></div>
            </div>
            
            <div className="space-y-3">
              <div className={`${card} rounded-2xl p-5 shadow-md`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {dark ? <Moon size={24} className="text-purple-600" /> : <Sun size={24} className="text-yellow-600" />}
                    <div>
                      <p className={`font-bold ${txt}`}>Modo Escuro</p>
                      <p className={`text-sm ${txt2}`}>Tema do aplicativo</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDark(!dark)} 
                    className={`w-14 h-8 rounded-full transition-all ${dark ? 'bg-purple-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${dark ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>

              <div className={`${card} rounded-2xl p-5 shadow-md`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell size={24} className="text-blue-600" />
                    <div>
                      <p className={`font-bold ${txt}`}>Notificações</p>
                      <p className={`text-sm ${txt2}`}>Lembretes de refeições</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setNotifications(!notifications)} 
                    className={`w-14 h-8 rounded-full transition-all ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-all ${notifications ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>

              <div className={`${card} rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <User size={24} className="text-green-600" />
                  <div>
                    <p className={`font-bold ${txt}`}>Editar Perfil</p>
                    <p className={`text-sm ${txt2}`}>Atualizar informações</p>
                  </div>
                </div>
              </div>

              <div className={`${card} rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer`}>
                <div className="flex items-center gap-3">
                  <History size={24} className="text-orange-600" />
                  <div>
                    <p className={`font-bold ${txt}`}>Limpar Histórico</p>
                    <p className={`text-sm ${txt2}`}>Remover dados antigos</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all mt-6">
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showProfile) {
    const imc = (user.weight / ((user.height/100) ** 2)).toFixed(1);
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
        <div className={`min-h-screen ${bg} p-4`}>
          <div className="max-w-2xl mx-auto py-6">
            <button 
              onClick={() => setShowProfile(false)} 
              className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Voltar
            </button>
            
            <div className={`${card} rounded-3xl p-6 shadow-xl mb-4`}>
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <User size={48} className="text-white" />
                </div>
                <h1 className={`text-3xl font-black ${txt} mb-2`}>{user.name}</h1>
                <p className={`${txt2}`}>Membro desde {user.date}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl mb-2">
                    <Trophy className="text-blue-600 mx-auto mb-1" size={24} />
                    <p className="text-2xl font-black text-blue-600">{user.level}</p>
                  </div>
                  <p className={`text-sm ${txt2}`}>Nível</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-2xl mb-2">
                    <Flame className="text-orange-600 mx-auto mb-1" size={24} />
                    <p className="text-2xl font-black text-orange-600">{user.streak}</p>
                  </div>
                  <p className={`text-sm ${txt2}`}>Sequência</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl mb-2">
                    <Crown className="text-purple-600 mx-auto mb-1" size={24} />
                    <p className="text-2xl font-black text-purple-600">{user.badges}</p>
                  </div>
                  <p className={`text-sm ${txt2}`}>Conquistas</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className={txt2}>Peso atual</span>
                  <span className={`font-bold ${txt}`}>{user.weight} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={txt2}>Altura</span>
                  <span className={`font-bold ${txt}`}>{user.height} cm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={txt2}>IMC</span>
                  <span className={`font-bold ${txt}`}>{imc}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={txt2}>Refeições registradas</span>
                  <span className={`font-bold ${txt}`}>{user.meals}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSettings(true)} 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Settings size={20} />
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela principal do app
  if (screen === 'app') {
    return (
      <div className={`min-h-screen ${bg} pb-24`}>
        {/* Header */}
        <div className={`${card} rounded-b-3xl p-4 shadow-lg mb-4`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-black ${txt}`}>Olá, {user.name}!</h1>
              <p className={txt2}>Vamos conquistar hoje 🔥</p>
            </div>
            <button onClick={() => setShowProfile(true)} className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User size={24} className="text-white" />
              </div>
              {notifications && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </button>
          </div>
          
          {/* XP Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" />
                <span className={`font-bold ${txt}`}>Nível {user.level}</span>
              </div>
              <span className={`text-sm ${txt2}`}>{user.xp}/{user.nextXp} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(user.xp / user.nextXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="px-4">
          {/* Tab: Home */}
          {tab === 'home' && (
            <div className="space-y-4">
              {/* Stats Overview - Cards superiores */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`${card} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Flame size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Hoje</span>
                  </div>
                  <p className={`text-3xl font-black ${txt} mb-1`}>{user.cal}</p>
                  <p className={`text-xs ${txt2}`}>de {user.goal_calories} calorias</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${(user.cal / user.goal_calories) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Zap size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Nível</span>
                  </div>
                  <p className={`text-3xl font-black ${txt} mb-1`}>{user.level}</p>
                  <p className={`text-xs ${txt2}`}>{user.xp}/{user.nextXp} XP</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${(user.xp / user.nextXp) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Trophy size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Sequência</span>
                  </div>
                  <p className={`text-3xl font-black ${txt} mb-1`}>{user.streak}</p>
                  <p className={`text-xs ${txt2}`}>dias consecutivos</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(7)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 h-1.5 rounded-full ${
                          i < user.streak ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Crown size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Conquistas</span>
                  </div>
                  <p className={`text-3xl font-black ${txt} mb-1`}>{user.badges}</p>
                  <p className={`text-xs ${txt2}`}>badges desbloqueadas</p>
                  <div className="flex gap-1 mt-2">
                    {['🏆', '⭐', '🔥', '💎'].map((emoji, i) => (
                      <div key={i} className="flex-1 text-center text-sm">{emoji}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Circular Progress - Calorias Principal */}
              <div className={`${card} rounded-3xl p-6 shadow-xl bg-gradient-to-br from-b
... [arquivo truncado por segurança]