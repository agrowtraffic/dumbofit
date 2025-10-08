"use client";
import React, { useState, useEffect } from 'react';
import { Home, Camera, User, TrendingUp, BookOpen, Plus, Mail, Lock, Trophy, Flame, Crown, Zap, Bell, ChevronLeft, Settings, X, Moon, Sun, Share2, History, Users, Trash2, Clock } from 'lucide-react';

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
    } catch (e) { 
      console.error(e); 
    }
    
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

  const handleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setScreen('quiz');
    setQuizStep(0);
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
                onClick={() => setScreen('login')} 
                className="w-full bg-white text-purple-600 py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-all"
              >
                Começar Jornada
              </button>
              <button 
                onClick={() => setScreen('login')} 
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

  if (screen === 'login') {
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
              <span className="text-3xl">🐘</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Bem-vindo!</h2>
            <p className="text-gray-600 text-lg">Entre para continuar sua jornada</p>
          </div>
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg transition-all" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Sua senha" 
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg transition-all" 
                />
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogin} 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-blue-600 to-pink-600 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Entrando...
              </div>
            ) : (
              'Entrar na minha conta'
            )}
          </button>
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
              <div className={`${card} rounded-3xl p-6 shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className={`text-xl font-black ${txt}`}>Meta Diária</h2>
                    <p className={`text-sm ${txt2}`}>Acompanhe seu progresso</p>
                  </div>
                  <button 
                    onClick={() => setShowCamera(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:scale-110 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-6">
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        fill="none" 
                        stroke="url(#gradient-main)" 
                        strokeWidth="12"
                        strokeDasharray={`${(user.cal / user.goal_calories) * 440} 440`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient-main" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6"/>
                          <stop offset="50%" stopColor="#a855f7"/>
                          <stop offset="100%" stopColor="#ec4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className={`text-4xl font-black ${txt}`}>{user.cal}</p>
                      <p className={`text-xs ${txt2} font-semibold`}>calorias</p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Consumido</p>
                        <p className="text-lg font-black text-gray-900">{user.cal} cal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Restante</p>
                        <p className="text-lg font-black text-gray-900">{user.goal_calories - user.cal} cal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 font-medium">Meta</p>
                        <p className="text-lg font-black text-gray-900">{user.goal_calories} cal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats - Água, Refeições, etc */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setWater(water + 0.2)}
                  className={`${card} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all active:scale-95`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">💧</div>
                    <p className="text-2xl font-black text-blue-600">{water.toFixed(1)}L</p>
                    <p className="text-xs text-gray-600 font-medium">Água</p>
                  </div>
                </button>

                <div className={`${card} rounded-2xl p-4 shadow-lg`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🍽️</div>
                    <p className="text-2xl font-black text-green-600">3</p>
                    <p className="text-xs text-gray-600 font-medium">Refeições</p>
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-4 shadow-lg`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <p className="text-2xl font-black text-orange-600">82g</p>
                    <p className="text-xs text-gray-600 font-medium">Proteína</p>
                  </div>
                </div>
              </div>

              {/* Desafio Semanal - Redesenhado */}
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-6 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl border border-white/30">
                        {challenge.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white mb-1">{challenge.title}</h3>
                        <p className="text-sm text-white/90">{challenge.desc}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-white">Progresso</span>
                      <span className="text-sm font-bold text-white">{challenge.prog}/{challenge.total}</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3 mb-3">
                      <div 
                        className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${(challenge.prog / challenge.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/90">Recompensa:</span>
                      <span className="text-lg font-black text-white">+{challenge.reward} XP 🎁</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Últimas Refeições - Redesenhado */}
              <div className={`${card} rounded-3xl p-6 shadow-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-black ${txt}`}>Refeições Recentes</h3>
                    <p className={`text-sm ${txt2}`}>Suas últimas entradas</p>
                  </div>
                  <button 
                    onClick={() => setShowHistory(true)} 
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Ver todas
                    <ChevronLeft size={16} className="rotate-180" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {history.slice(0, 3).map((item, index) => (
                    <div 
                      key={item.id} 
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                          {item.photo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-lg ${txt} truncate group-hover:text-blue-600 transition-colors`}>
                            {item.name}
                          </p>
                          <p className={`text-sm ${txt2}`}>
                            {item.time} • {item.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-blue-600">{item.cal}</p>
                          <p className="text-xs text-gray-500 font-semibold">calorias</p>
                          <p className="text-xs text-purple-600 font-semibold">{item.prot}g prot</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all"></div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowCamera(true)}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  Adicionar Nova Refeição
                </button>
              </div>

              {/* Dicas Rápidas */}
              <div className={`${card} rounded-3xl p-6 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    💡
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-emerald-900 mb-2">Dica do Dia</h3>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      Beba água antes das refeições para aumentar a sensação de saciedade e auxiliar na digestão. Isso pode ajudar no controle do apetite!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Receitas */}
          {tab === 'recipes' && (
            <div className="space-y-4">
              {/* Header com animação */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">🐘👨‍🍳</span>
                    <h2 className={`text-3xl font-black ${txt}`}>Dumbo Chefe</h2>
                  </div>
                  <p className={`text-sm ${txt2}`}>Receitas criadas com IA especialmente para você</p>
                </div>
                <button 
                  onClick={() => setShowRecipeGen(true)} 
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-xl hover:scale-110 transition-all">
                    <Plus size={24} />
                  </div>
                </button>
              </div>

              {/* Stats das receitas */}
              {recipes.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  <div className={`${card} rounded-2xl p-4 shadow-lg text-center`}>
                    <div className="text-3xl mb-2">📊</div>
                    <p className="text-2xl font-black text-blue-600">{recipes.length}</p>
                    <p className="text-xs text-gray-600 font-medium">Receitas</p>
                  </div>
                  <div className={`${card} rounded-2xl p-4 shadow-lg text-center`}>
                    <div className="text-3xl mb-2">⭐</div>
                    <p className="text-2xl font-black text-yellow-600">{recipes.length * 2}</p>
                    <p className="text-xs text-gray-600 font-medium">Favoritas</p>
                  </div>
                  <div className={`${card} rounded-2xl p-4 shadow-lg text-center`}>
                    <div className="text-3xl mb-2">👨‍🍳</div>
                    <p className="text-2xl font-black text-green-600">{recipes.length * 3}</p>
                    <p className="text-xs text-gray-600 font-medium">Preparos</p>
                  </div>
                </div>
              )}
              
              {recipes.length === 0 ? (
                // Empty State Melhorado
                <div className="relative overflow-hidden">
                  {/* Background decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
                  
                  <div className={`relative ${card} rounded-3xl p-12 shadow-xl text-center border-2 border-dashed border-gray-200`}>
                    {/* Logo Dumbo Chefe */}
                    <div className="flex justify-center items-center gap-3 mb-6">
                      <div className="text-6xl animate-bounce">🐘</div>
                      <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>👨‍🍳</div>
                    </div>
                    
                    <h3 className={`text-3xl font-black ${txt} mb-2`}>Dumbo Chefe</h3>
                    <p className="text-lg font-semibold text-purple-600 mb-4">Seu Chef Pessoal com IA</p>
                    <p className={`${txt2} mb-8 max-w-md mx-auto leading-relaxed`}>
                      Crie receitas personalizadas com inteligência artificial. Escolha seu objetivo nutricional e deixe a mágica acontecer!
                    </p>
                    
                    {/* Features cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4">
                        <div className="text-3xl mb-2">⚡</div>
                        <p className="text-sm font-bold text-blue-900">Instantâneo</p>
                        <p className="text-xs text-blue-700">Receitas em segundos</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4">
                        <div className="text-3xl mb-2">🎯</div>
                        <p className="text-sm font-bold text-purple-900">Personalizado</p>
                        <p className="text-xs text-purple-700">Seu objetivo, seu sabor</p>
                      </div>
                      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-4">
                        <div className="text-3xl mb-2">🌟</div>
                        <p className="text-sm font-bold text-pink-900">Nutritivo</p>
                        <p className="text-xs text-pink-700">Balanceado e saudável</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowRecipeGen(true)} 
                      className="relative group inline-block"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all"></div>
                      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-10 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                        <span className="text-2xl">🐘</span>
                        Criar com Dumbo Chefe
                        <span className="text-2xl">👨‍🍳</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                // Grid de Receitas Melhorado
                <div className="space-y-4">
                  {/* Filtros rápidos */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['Todas', 'Favoritas', 'Rápidas', 'Baixa Cal', 'Proteicas'].map((filter) => (
                      <button
                        key={filter}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                          filter === 'Todas'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Grid de receitas com layout aprimorado */}
                  <div className="grid gap-4">
                    {recipes.map((r) => (
                      <div 
                        key={r.id} 
                        onClick={() => setRecipe(r)} 
                        className="group cursor-pointer"
                      >
                        <div className={`${card} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]`}>
                          {/* Header colorido */}
                          <div className="relative h-32 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-7xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                                {r.emoji}
                              </div>
                            </div>
                            {/* Badge de objetivo */}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                              <span className="text-xs font-bold text-gray-800">
                                {objs.find(o => o.id === r.obj)?.emoji} {objs.find(o => o.id === r.obj)?.name}
                              </span>
                            </div>
                            {/* Badge de novo */}
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full shadow-lg">
                              <span className="text-xs font-bold">✨ NOVA</span>
                            </div>
                          </div>
                          
                          {/* Conteúdo */}
                          <div className="p-5">
                            <h3 className={`font-black text-xl ${txt} mb-3 group-hover:text-blue-600 transition-colors line-clamp-2`}>
                              {r.name}
                            </h3>
                            
                            {/* Tags de informação */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              <div className="flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl">
                                <Flame size={14} />
                                <span className="text-xs font-bold">{r.calories} cal</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-xl">
                                <Clock size={14} />
                                <span className="text-xs font-bold">{r.time} min</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-xl">
                                <span className="text-xs font-bold">⚡ {r.difficulty}</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-xl">
                                <Users size={14} />
                                <span className="text-xs font-bold">{r.servings} porções</span>
                              </div>
                            </div>

                            {/* Dica preview */}
                            {r.tips && (
                              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-3 rounded-lg mb-4">
                                <p className="text-xs text-gray-700 line-clamp-2">
                                  <span className="font-bold">💡 Dica:</span> {r.tips}
                                </p>
                              </div>
                            )}

                            {/* Footer com ações */}
                            <div className="flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecipe(r);
                                }}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                              >
                                <BookOpen size={16} />
                                Ver Receita
                              </button>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white border-2 border-gray-200 p-3 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group/btn"
                              >
                                <span className="text-gray-400 group-hover/btn:text-red-500 transition-colors text-xl">❤️</span>
                              </button>
                              <button 
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white border-2 border-gray-200 p-3 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
                              >
                                <Share2 size={18} className="text-gray-400 hover:text-blue-500 transition-colors" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA para criar mais */}
                  <button 
                    onClick={() => setShowRecipeGen(true)}
                    className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-3xl p-8 hover:border-purple-400 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg group-hover:scale-110 transition-transform">
                        <Plus size={32} />
                      </div>
                      <div className="text-left">
                        <p className="text-xl font-black text-gray-900 mb-1">Criar Nova Receita</p>
                        <p className="text-sm text-gray-600">Use IA para gerar mais receitas personalizadas</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab: Progresso */}
          {tab === 'progress' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="text-center mb-2">
                <h2 className={`text-3xl font-black ${txt} mb-1`}>Seu Progresso</h2>
                <p className={`text-sm ${txt2}`}>Acompanhe sua evolução</p>
              </div>

              {/* Cards de Métricas Principais */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`${card} rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Trophy size={24} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Nível</span>
                    </div>
                    <p className="text-4xl font-black text-blue-600 mb-1">{user.level}</p>
                    <p className="text-xs text-gray-600 mb-3">Próximo em {user.nextXp - user.xp} XP</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(user.xp / user.nextXp) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <Flame size={24} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Dias</span>
                    </div>
                    <p className="text-4xl font-black text-orange-600 mb-1">{user.streak}</p>
                    <p className="text-xs text-gray-600 mb-3">Sequência atual</p>
                    <div className="flex gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 h-2 rounded-full transition-all ${
                            i < user.streak % 7 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Total</span>
                    </div>
                    <p className="text-4xl font-black text-green-600 mb-1">{user.meals}</p>
                    <p className="text-xs text-gray-600 mb-3">Refeições registradas</p>
                    <p className="text-xs font-bold text-green-600">+12 esta semana 📈</p>
                  </div>
                </div>

                <div className={`${card} rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -mr-10 -mt-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Crown size={24} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Badges</span>
                    </div>
                    <p className="text-4xl font-black text-purple-600 mb-1">{user.badges}</p>
                    <p className="text-xs text-gray-600 mb-3">Conquistas</p>
                    <p className="text-xs font-bold text-purple-600">3 novas! 🎉</p>
                  </div>
                </div>
              </div>

              {/* Gráfico de Calorias Semanal */}
              <div className={`${card} rounded-3xl p-6 shadow-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-xl font-black ${txt} mb-1`}>Calorias Semanais</h3>
                    <p className={`text-sm ${txt2}`}>Últimos 7 dias</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-blue-600">1,847</p>
                    <p className="text-xs text-gray-600">média/dia</p>
                  </div>
                </div>
                
                <div className="flex items-end justify-between h-48 gap-2 mb-4">
                  {[
                    { day: 'D', value: 1650, color: 'from-blue-400 to-blue-600' },
                    { day: 'S', value: 1820, color: 'from-blue-400 to-blue-600' },
                    { day: 'T', value: 1750, color: 'from-blue-400 to-blue-600' },
                    { day: 'Q', value: 1950, color: 'from-purple-400 to-purple-600' },
                    { day: 'Q', value: 1680, color: 'from-blue-400 to-blue-600' },
                    { day: 'S', value: 1880, color: 'from-blue-400 to-blue-600' },
                    { day: 'S', value: 2000, color: 'from-pink-400 to-pink-600' }
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group">
                      <div className="relative w-full mb-2">
                        <div 
                          className={`w-full bg-gradient-to-t ${item.color} rounded-t-xl transition-all hover:opacity-80 cursor-pointer relative`}
                          style={{ height: `${(item.value / 2000) * 180}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                            {item.value} cal
                          </div>
                        </div>
                      </div>
                      <p className={`text-xs font-bold ${txt2}`}>{item.day}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                    <span className={txt2}>Dentro da meta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                    <span className={txt2}>Acima da meta</span>
                  </div>
                </div>
              </div>

              {/* Gráfico de Peso/Evolução */}
              <div className={`${card} rounded-3xl p-6 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">Evolução de Peso</h3>
                    <p className="text-sm text-gray-600">Últimas 4 semanas</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-600">-2.3 kg</p>
                    <p className="text-xs text-gray-600">no período</p>
                  </div>
                </div>

                <div className="relative h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="25" x2="300" y2="25" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4" />
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4" />
                    
                    {/* Gradient area */}
                    <defs>
                      <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 60 L 75 55 L 150 50 L 225 45 L 300 35"
                      fill="url(#weightGradient)"
                      stroke="none"
                    />
                    
                    {/* Line */}
                    <path
                      d="M 0 60 L 75 55 L 150 50 L 225 45 L 300 35"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    
                    {/* Points */}
                    <circle cx="0" cy="60" r="4" fill="#10b981" />
                    <circle cx="75" cy="55" r="4" fill="#10b981" />
                    <circle cx="150" cy="50" r="4" fill="#10b981" />
                    <circle cx="225" cy="45" r="4" fill="#10b981" />
                    <circle cx="300" cy="35" r="5" fill="#10b981" stroke="white" strokeWidth="2" />
                  </svg>
                  
                  <div className="flex justify-between mt-2">
                    {['57.3kg', '56.8kg', '56.2kg', '55.7kg', '55.0kg'].map((weight, i) => (
                      <p key={i} className="text-xs font-bold text-emerald-700">{weight}</p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Início</p>
                    <p className="text-lg font-black text-gray-900">57.3kg</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Atual</p>
                    <p className="text-lg font-black text-emerald-600">55.0kg</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Meta</p>
                    <p className="text-lg font-black text-blue-600">53.0kg</p>
                  </div>
                </div>
              </div>

              {/* Gráfico de Macronutrientes */}
              <div className={`${card} rounded-3xl p-6 shadow-xl`}>
                <div className="mb-6">
                  <h3 className={`text-xl font-black ${txt} mb-1`}>Macronutrientes Hoje</h3>
                  <p className={`text-sm ${txt2}`}>Distribuição atual</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="35" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="8"
                          strokeDasharray={`${(82 / 120) * 220} 220`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg font-black text-blue-600">68%</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Proteína</p>
                    <p className="text-xs text-gray-600">82g de 120g</p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="35" 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="8"
                          strokeDasharray={`${(145 / 200) * 220} 220`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg font-black text-green-600">73%</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Carboidrato</p>
                    <p className="text-xs text-gray-600">145g de 200g</p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="35" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="35" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="8"
                          strokeDasharray={`${(35 / 50) * 220} 220`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-lg font-black text-amber-600">70%</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Gordura</p>
                    <p className="text-xs text-gray-600">35g de 50g</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 via-green-50 to-amber-50 rounded-2xl p-4">
                  <p className="text-sm font-bold text-gray-900 mb-2">Distribuição Ideal</p>
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 flex-[30]"></div>
                    <div className="bg-green-500 flex-[50]"></div>
                    <div className="bg-amber-500 flex-[20]"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-600">
                    <span>30% Prot</span>
                    <span>50% Carb</span>
                    <span>20% Gord</span>
                  </div>
                </div>
              </div>

              {/* Conquistas Recentes */}
              <div className={`${card} rounded-3xl p-6 shadow-xl`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-xl font-black ${txt}`}>Conquistas</h3>
                    <p className={`text-sm ${txt2}`}>Seus marcos especiais</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                    {user.badges}/50
                  </span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { icon: '🏆', title: 'Primeira Semana', desc: 'Complete 7 dias de registro', color: 'from-yellow-400 to-orange-500', achieved: true, date: 'Há 2 dias' },
                    { icon: '🔥', title: 'Sequência de Fogo', desc: '15 dias consecutivos', color: 'from-red-400 to-pink-500', achieved: true, date: 'Hoje' },
                    { icon: '⭐', title: 'Estrela Nutricional', desc: '50 refeições saudáveis', color: 'from-blue-400 to-purple-500', achieved: true, date: 'Ontem' },
                    { icon: '💎', title: 'Diamante', desc: '100 dias de sequência', color: 'from-gray-300 to-gray-400', achieved: false, progress: 15 }
                  ].map((badge, i) => (
                    <div 
                      key={i} 
                      className={`relative overflow-hidden rounded-2xl ${
                        badge.achieved 
                          ? 'bg-gradient-to-r ' + badge.color 
                          : 'bg-gray-100 border-2 border-dashed border-gray-300'
                      } p-4`}
                    >
                      {badge.achieved && (
                        <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm px-2 py-1 rounded-full">
                          <p className="text-xs font-bold text-white">✓ Desbloqueada</p>
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${
                          badge.achieved 
                            ? 'bg-white/20 backdrop-blur-sm border-2 border-white/30' 
                            : 'bg-gray-200'
                        } rounded-2xl flex items-center justify-center text-3xl`}>
                          {badge.achieved ? badge.icon : '🔒'}
                        </div>
                        <div className="flex-1">
                          <p className={`font-bold text-lg ${badge.achieved ? 'text-white' : 'text-gray-500'}`}>
                            {badge.title}
                          </p>
                          <p className={`text-sm ${badge.achieved ? 'text-white/90' : 'text-gray-500'}`}>
                            {badge.desc}
                          </p>
                          {badge.achieved && badge.date && (
                            <p className="text-xs text-white/80 mt-1">{badge.date}</p>
                          )}
                          {!badge.achieved && badge.progress && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-300 rounded-full h-2">
                                <div 
                                  className="bg-gray-500 h-2 rounded-full transition-all"
                                  style={{ width: `${badge.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{badge.progress}% completo</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dica Motivacional */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10 text-white text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-black mb-3">Continue Assim!</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    Você está {((user.streak / 30) * 100).toFixed(0)}% do caminho para completar 30 dias de sequência. 
                    Não desista agora!
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <p className="text-sm font-bold mb-2">Faltam apenas {30 - user.streak} dias</p>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div 
                        className="bg-white h-3 rounded-full transition-all"
                        style={{ width: `${(user.streak / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Social */}
          {tab === 'social' && (
            <div className="space-y-4">
              <h2 className={`text-2xl font-black ${txt}`}>Comunidade</h2>
              
              <div className={`${card} rounded-3xl p-6 shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${txt}`}>Seus Amigos</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                    {user.friends}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'João Silva', level: 15, streak: 20, avatar: '👨' },
                    { name: 'Maria Santos', level: 18, streak: 25, avatar: '👩' },
                    { name: 'Pedro Costa', level: 10, streak: 12, avatar: '👨‍🦱' }
                  ].map((friend, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                        {friend.avatar}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold ${txt}`}>{friend.name}</p>
                        <p className={`text-sm ${txt2}`}>Nível {friend.level} • {friend.streak} dias</p>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-all">
                        Ver
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${card} rounded-3xl p-6 shadow-lg`}>
                <h3 className={`text-lg font-bold ${txt} mb-4`}>Ranking Global</h3>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Carlos Almeida', xp: 5420, badge: '🥇' },
                    { rank: 2, name: 'Ana Paula', xp: 5180, badge: '🥈' },
                    { rank: 3, name: 'Ricardo Lima', xp: 4950, badge: '🥉' },
                    { rank: 47, name: user.name, xp: user.xp, badge: '⭐' }
                  ].map((player, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-4 p-4 rounded-2xl ${
                        player.name === user.name 
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl w-8 text-center font-bold">{player.badge}</span>
                      <div className="flex-1">
                        <p className={`font-bold ${player.name === user.name ? 'text-orange-900' : 'text-gray-900'}`}>
                          #{player.rank} {player.name}
                        </p>
                        <p className="text-sm text-gray-600">{player.xp} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${card} rounded-3xl p-6 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50`}>
                <div className="text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Convide Amigos!</h3>
                  <p className="text-gray-600 mb-4">Ganhe 100 XP por cada amigo que se juntar</p>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-8 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                    <Share2 size={20} />
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className={`fixed bottom-0 left-0 right-0 ${card} border-t rounded-t-3xl shadow-2xl`}>
          <div className="flex items-center justify-around p-4">
            <button 
              onClick={() => setTab('home')} 
              className={`flex flex-col items-center gap-1 transition-all ${
                tab === 'home' ? 'text-blue-600 scale-110' : txt2
              }`}
            >
              <Home size={24} />
              <span className="text-xs font-semibold">Início</span>
            </button>
            
            <button 
              onClick={() => setTab('recipes')} 
              className={`flex flex-col items-center gap-1 transition-all ${
                tab === 'recipes' ? 'text-blue-600 scale-110' : txt2
              }`}
            >
              <BookOpen size={24} />
              <span className="text-xs font-semibold">Receitas</span>
            </button>
            
            <button 
              onClick={() => setShowCamera(true)} 
              className="relative -mt-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                <Camera size={28} className="text-white" />
              </div>
            </button>
            
            <button 
              onClick={() => setTab('progress')} 
              className={`flex flex-col items-center gap-1 transition-all ${
                tab === 'progress' ? 'text-blue-600 scale-110' : txt2
              }`}
            >
              <TrendingUp size={24} />
              <span className="text-xs font-semibold">Progresso</span>
            </button>
            
            <button 
              onClick={() => setTab('social')} 
              className={`flex flex-col items-center gap-1 transition-all ${
                tab === 'social' ? 'text-blue-600 scale-110' : txt2
              }`}
            >
              <Users size={24} />
              <span className="text-xs font-semibold">Social</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}