import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{moduleId: number, lessonId: number} | null>(null);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const toggleLessonComplete = (moduleId: number, lessonId: number) => {
    const key = `${moduleId}-${lessonId}`;
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const modulesWithLessons = [
    {
      id: 1,
      title: 'Основы нейрофотосессии',
      description: 'Погружение в мир AI-фотографии: от теории до практики',
      icon: 'Sparkles',
      duration: '3 часа',
      topics: ['Введение в нейросети', 'Выбор платформ', 'Базовые принципы', 'Анализ трендов'],
      lessons: [
        { id: 1, title: 'Введение в нейрофотографию', duration: '12:34', description: 'Что такое нейрофотография и почему она меняет индустрию', videoUrl: '#' },
        { id: 2, title: 'Выбор AI-платформы', duration: '18:22', description: 'Обзор лучших платформ: Midjourney, DALL-E, Stable Diffusion', videoUrl: '#' },
        { id: 3, title: 'Первая генерация', duration: '15:45', description: 'Создаём первое AI-изображение пошагово', videoUrl: '#' },
        { id: 4, title: 'Анализ трендов 2025', duration: '22:11', description: 'Какие стили сейчас в топе и почему', videoUrl: '#' },
        { id: 5, title: 'Базовые параметры', duration: '19:33', description: 'Разбираем ключевые настройки генерации', videoUrl: '#' },
        { id: 6, title: 'Этика и авторство', duration: '14:28', description: 'Правовые аспекты использования AI-изображений', videoUrl: '#' },
        { id: 7, title: 'Референсы и стили', duration: '17:55', description: 'Как правильно использовать референсные изображения', videoUrl: '#' },
        { id: 8, title: 'Практическое задание', duration: '25:00', description: 'Создаём 5 разных стилей одного портрета', videoUrl: '#' }
      ]
    },
    {
      id: 2,
      title: 'Промты и техники генерации',
      description: 'Создание идеальных промтов для профессиональных результатов',
      icon: 'Wand2',
      duration: '5 часов',
      topics: ['Структура промта', 'Стилизация', 'Композиция', 'Освещение и настроение'],
      lessons: [
        { id: 1, title: 'Анатомия идеального промта', duration: '21:12', description: 'Структура промта: что писать и в каком порядке', videoUrl: '#' },
        { id: 2, title: 'Ключевые слова и модификаторы', duration: '18:44', description: 'Магические слова, которые улучшают результат', videoUrl: '#' },
        { id: 3, title: 'Управление композицией', duration: '23:15', description: 'Как задать нужный ракурс и кадрирование', videoUrl: '#' },
        { id: 4, title: 'Работа с освещением', duration: '19:38', description: 'Cinematic lighting, golden hour и другие приёмы', videoUrl: '#' },
        { id: 5, title: 'Стилизация: от реализма до фэнтези', duration: '26:42', description: 'Как задать художественный стиль изображению', videoUrl: '#' },
        { id: 6, title: 'Negative prompts', duration: '16:33', description: 'Что исключить, чтобы получить идеальный результат', videoUrl: '#' },
        { id: 7, title: 'Работа с деталями', duration: '20:55', description: 'Как прописать текстуры, материалы, детали одежды', videoUrl: '#' },
        { id: 8, title: 'Эмоции и настроение', duration: '17:28', description: 'Передаём чувства через AI-генерацию', videoUrl: '#' },
        { id: 9, title: 'Портретные промты', duration: '24:11', description: 'Специфика создания портретов высокого качества', videoUrl: '#' },
        { id: 10, title: 'Лайфстайл сцены', duration: '22:37', description: 'Создаём атмосферные повседневные сцены', videoUrl: '#' },
        { id: 11, title: 'Коммерческая фотография', duration: '19:44', description: 'Промты для продуктовой и рекламной съёмки', videoUrl: '#' },
        { id: 12, title: 'Творческое задание', duration: '28:00', description: 'Создаём серию из 10 изображений в едином стиле', videoUrl: '#' }
      ]
    },
    {
      id: 3,
      title: 'Монетизация и продвижение',
      description: 'Превращение навыков в стабильный доход',
      icon: 'TrendingUp',
      duration: '4 часа',
      topics: ['Поиск клиентов', 'Ценообразование', 'Портфолио', 'Маркетинг в соцсетях'],
      lessons: [
        { id: 1, title: 'Ниши и целевая аудитория', duration: '18:22', description: 'Где искать клиентов для AI-фотографий', videoUrl: '#' },
        { id: 2, title: 'Создание портфолио', duration: '22:15', description: 'Как правильно оформить работы для продажи', videoUrl: '#' },
        { id: 3, title: 'Ценообразование', duration: '16:44', description: 'Сколько стоит нейрофотосессия в 2025', videoUrl: '#' },
        { id: 4, title: 'Площадки для продаж', duration: '20:33', description: 'Где продавать: стоки, маркетплейсы, соцсети', videoUrl: '#' },
        { id: 5, title: 'Instagram для AI-фотографа', duration: '24:11', description: 'Стратегия продвижения в Instagram', videoUrl: '#' },
        { id: 6, title: 'TikTok и YouTube Shorts', duration: '17:55', description: 'Вирусный контент с AI-генерациями', videoUrl: '#' },
        { id: 7, title: 'Работа с клиентами', duration: '19:28', description: 'От первого контакта до сдачи проекта', videoUrl: '#' },
        { id: 8, title: 'Пакеты услуг', duration: '15:42', description: 'Как упаковать предложения для разных ниш', videoUrl: '#' },
        { id: 9, title: 'Масштабирование', duration: '21:37', description: 'От фриланса к агентству AI-фотографии', videoUrl: '#' },
        { id: 10, title: 'Финальный проект', duration: '30:00', description: 'Создаём коммерческий кейс от А до Я', videoUrl: '#' }
      ]
    }
  ];

  const modules = modulesWithLessons.map(m => ({
    id: m.id,
    title: m.title,
    description: m.description,
    icon: m.icon,
    lessons: m.lessons.length,
    duration: m.duration,
    topics: m.topics
  }));

  const promptLibrary = [
    {
      category: 'Портреты',
      prompts: [
        'Professional headshot of a confident businesswoman, studio lighting, sharp focus, corporate attire, neutral background',
        'Cinematic portrait of a young artist, moody lighting, creative studio, bohemian style, shallow depth of field',
        'Fashion editorial portrait, high-end magazine style, dramatic makeup, avant-garde styling, studio setup',
        'Natural light portrait, golden hour, outdoor setting, candid expression, soft bokeh background',
        'Vintage film portrait, 1970s aesthetic, grainy texture, warm tones, retro fashion',
        'Cyberpunk character portrait, neon lights, futuristic cityscape, tech wear, dramatic colors',
        'Minimalist portrait, clean background, soft shadows, elegant pose, timeless aesthetic',
        'Double exposure portrait, nature elements overlay, artistic composition, dreamy atmosphere'
      ]
    },
    {
      category: 'Лайфстайл',
      prompts: [
        'Cozy coffee shop scene, morning light, steam rising from cup, rustic interior, warm ambiance',
        'Yoga practice at sunrise, beach setting, peaceful atmosphere, wellness lifestyle',
        'Modern home office, minimalist design, natural light, productive workspace, plants',
        'Urban street fashion, city backdrop, confident pose, trendy outfit, editorial style',
        'Healthy breakfast flatlay, colorful ingredients, natural light, food photography aesthetic',
        'Fitness training scene, gym environment, dynamic movement, motivational energy',
        'Reading in nature, peaceful forest setting, natural light, cozy blanket, serene mood',
        'Creative workspace, artistic tools, inspiring setup, soft lighting, aesthetic arrangement'
      ]
    },
    {
      category: 'Концептуальные',
      prompts: [
        'Surreal dreamscape, floating objects, ethereal atmosphere, impossible architecture, artistic vision',
        'Abstract portrait with geometric shapes, vibrant colors, modern art style, creative composition',
        'Fantasy character in magical forest, mystical lighting, enchanted atmosphere, detailed environment',
        'Sci-fi scene with futuristic technology, blue-purple tones, high-tech elements, cinematic feel',
        'Emotional storytelling shot, dramatic lighting, symbolic elements, deep narrative, artistic approach',
        'Mixed media artwork portrait, collage style, artistic layers, creative textures, unique vision',
        'Metaphorical composition, visual poetry, symbolic imagery, thought-provoking concept',
        'Time manipulation concept, multiple exposures, dynamic movement, creative timeline visualization'
      ]
    },
    {
      category: 'Коммерческие',
      prompts: [
        'Product showcase, luxury item, clean background, professional lighting, commercial quality',
        'Brand lifestyle photography, aspirational scene, modern aesthetic, marketing ready',
        'E-commerce product shot, white background, multiple angles, detailed view, professional standard',
        'Advertising campaign visual, emotional connection, brand story, high-end production value',
        'Social media content, engaging composition, trendy style, shareable aesthetic',
        'Corporate team photo, professional setting, confident poses, business environment',
        'Real estate interior, wide angle, bright and airy, welcoming atmosphere, architectural details',
        'Restaurant food photography, appetizing presentation, mood lighting, culinary artistry'
      ]
    },
    {
      category: 'Художественные',
      prompts: [
        'Fine art portrait, Renaissance painting style, classical composition, museum quality',
        'Contemporary art piece, bold colors, abstract elements, gallery exhibition worthy',
        'Black and white fine art, dramatic contrast, emotional depth, timeless elegance',
        'Impressionist style scene, soft brushstrokes effect, pastel colors, dreamy atmosphere',
        'Pop art inspired portrait, vibrant colors, graphic elements, Andy Warhol style',
        'Minimalist art photography, negative space, simple composition, zen aesthetic',
        'Baroque style portrait, dramatic lighting, rich textures, ornate details, classical beauty',
        'Street art meets photography, urban culture, graffiti elements, contemporary edge'
      ]
    },
    {
      category: 'Природа и путешествия',
      prompts: [
        'Epic landscape, mountain vista, golden hour light, dramatic sky, adventure photography',
        'Tropical paradise beach, turquoise water, palm trees, vacation vibes, travel photography',
        'Urban exploration, abandoned building, atmospheric lighting, urban decay aesthetic',
        'Wildlife portrait, natural habitat, intimate moment, conservation photography style',
        'Autumn forest path, falling leaves, warm colors, peaceful nature scene',
        'Architectural photography, modern building, geometric lines, blue hour lighting',
        'Desert landscape, sand dunes, minimalist composition, warm earth tones',
        'Coastal seascape, long exposure, smooth water, rocks, serene atmosphere'
      ]
    }
  ];

  const galleryExamples = [
    {
      title: 'Fashion Editorial',
      style: 'Высокая мода, студийный свет',
      trend: 'Trending'
    },
    {
      title: 'Urban Portrait',
      style: 'Уличная фотография, естественный свет',
      trend: 'Popular'
    },
    {
      title: 'Surreal Art',
      style: 'Концептуальное искусство',
      trend: 'Viral'
    },
    {
      title: 'Minimalist Beauty',
      style: 'Минимализм, чистые линии',
      trend: 'Trending'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30">
              Онлайн-курс
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Нейрофотосессия
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Создавай трендовые AI-фотографии и монетизируй своё творчество
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 rounded-xl shadow-xl hover-scale">
                    <Icon name="Zap" className="mr-2" size={20} />
                    Начать обучение
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-purple-500/30 max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-purple-300">Оплата курса</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Получите доступ ко всем материалам навсегда
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-slate-500 line-through">5 990 ₽</span>
                        <Badge className="bg-pink-500 text-white border-0">-50%</Badge>
                      </div>
                      <div className="text-5xl font-bold text-white mb-2">2 990 ₽</div>
                      <div className="text-slate-400">Единоразовая оплата</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-300">
                        <Icon name="Check" className="text-green-400" size={20} />
                        <span>3 модуля обучения</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <Icon name="Check" className="text-green-400" size={20} />
                        <span>Библиотека 50+ промтов</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <Icon name="Check" className="text-green-400" size={20} />
                        <span>Галерея лучших примеров</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                        <Icon name="Check" className="text-green-400" size={20} />
                        <span>Бессрочный доступ</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-slate-800/50 p-4 rounded-xl border border-purple-500/20">
                        <div className="text-sm text-slate-400 mb-2">Номер карты для оплаты:</div>
                        <div className="flex items-center gap-3">
                          <code className="text-lg font-mono text-purple-300">2204 3204 2826 7423</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            onClick={() => {
                              navigator.clipboard.writeText('2204320428267423');
                            }}
                          >
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg py-6 rounded-xl" size="lg">
                        <Icon name="CreditCard" className="mr-2" size={20} />
                        Я оплатил
                      </Button>
                    </div>
                    <p className="text-xs text-center text-slate-500">
                      После оплаты вы получите доступ к курсу
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-lg px-8 py-6 rounded-xl">
                <Icon name="Play" className="mr-2" size={20} />
                Демо урок
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">30+</div>
                <div className="text-sm text-slate-400">Уроков</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-1">50+</div>
                <div className="text-sm text-slate-400">Промтов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">∞</div>
                <div className="text-sm text-slate-400">Доступ</div>
              </div>
            </div>
          </div>

          {/* Gallery Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {galleryExamples.map((item, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/20 backdrop-blur-sm overflow-hidden group hover-scale cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Image" size={48} className="text-purple-300/30 group-hover:scale-110 transition-transform" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-pink-500/90 text-white border-0 text-xs">
                    {item.trend}
                  </Badge>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm text-white">{item.title}</CardTitle>
                  <CardDescription className="text-xs text-slate-400">{item.style}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <Tabs defaultValue="modules" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-slate-800/50 border border-purple-500/20 p-1 rounded-xl">
            <TabsTrigger value="modules" className="data-[state=active]:bg-purple-600 rounded-lg">
              <Icon name="BookOpen" className="mr-2" size={16} />
              Модули
            </TabsTrigger>
            <TabsTrigger value="prompts" className="data-[state=active]:bg-purple-600 rounded-lg">
              <Icon name="Library" className="mr-2" size={16} />
              Промты
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-600 rounded-lg">
              <Icon name="Sparkles" className="mr-2" size={16} />
              Галерея
            </TabsTrigger>
          </TabsList>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Программа курса</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                3 модуля от основ до монетизации. Учись в своём темпе с бессрочным доступом
              </p>
            </div>

            {/* Progress Card */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border-purple-500/30 backdrop-blur-sm max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Trophy" className="text-yellow-400" size={24} />
                  Ваш прогресс
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-3 mb-3" />
                <p className="text-sm text-slate-400">{progress}% завершено</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {modules.map((module, index) => (
                <Card 
                  key={module.id}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-purple-500/30 backdrop-blur-sm hover-scale cursor-pointer group overflow-hidden"
                  onClick={() => setActiveModule(module.id)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300" />
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                      <Icon name={module.icon as any} size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-xl text-white mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-slate-400">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Icon name="Video" size={16} className="text-purple-400" />
                        {module.lessons} уроков
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Icon name="Clock" size={16} className="text-purple-400" />
                        {module.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {module.topics.slice(0, 2).map((topic, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                          {topic}
                        </Badge>
                      ))}
                      {module.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                          +{module.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModule(module.id);
                      }}
                    >
                      Начать модуль
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prompts Tab */}
          <TabsContent value="prompts" className="space-y-6 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Библиотека промтов</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                50+ готовых промтов для создания профессиональных нейрофотографий
              </p>
            </div>

            <ScrollArea className="h-[600px] rounded-xl border border-purple-500/20 bg-slate-900/50 backdrop-blur-sm p-6">
              <div className="space-y-8">
                {promptLibrary.map((category, catIndex) => (
                  <div key={catIndex} className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                      <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {category.prompts.length}
                      </Badge>
                    </div>
                    <div className="grid gap-3">
                      {category.prompts.map((prompt, promptIndex) => (
                        <Card 
                          key={promptIndex}
                          className="bg-slate-800/40 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer hover-scale"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                                <Icon name="Sparkles" size={16} className="text-purple-400" />
                              </div>
                              <p className="text-sm text-slate-300 leading-relaxed flex-1">{prompt}</p>
                              <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                                <Icon name="Copy" size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Галерея вдохновения</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Лучшие работы и актуальные тренды в нейрофотографии
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card 
                  key={index}
                  className="bg-slate-800/40 border-purple-500/20 overflow-hidden group hover-scale cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="Image" size={64} className="text-white/20 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div className="space-y-1">
                        <p className="text-white font-semibold text-sm">AI Portrait #{index + 1}</p>
                        <p className="text-slate-300 text-xs">Trending style</p>
                      </div>
                    </div>
                    {index % 3 === 0 && (
                      <Badge className="absolute top-2 right-2 bg-pink-500 text-white border-0 text-xs">
                        <Icon name="TrendingUp" size={12} className="mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 rounded-xl">
                Загрузить ещё
                <Icon name="RefreshCw" className="ml-2" size={16} />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-purple-500/20 py-16 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Готовы начать?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к курсу и создавайте профессиональные нейрофотографии уже сегодня
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-12 py-6 rounded-xl shadow-2xl hover-scale">
                <Icon name="Rocket" className="mr-2" size={20} />
                Купить курс за 2 990 ₽
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-purple-500/30 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl text-purple-300">Оплата курса</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Получите доступ ко всем материалам навсегда
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-slate-500 line-through">5 990 ₽</span>
                    <Badge className="bg-pink-500 text-white border-0">-50%</Badge>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">2 990 ₽</div>
                  <div className="text-slate-400">Единоразовая оплата</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Icon name="Check" className="text-green-400" size={20} />
                    <span>3 модуля обучения</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Icon name="Check" className="text-green-400" size={20} />
                    <span>Библиотека 50+ промтов</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Icon name="Check" className="text-green-400" size={20} />
                    <span>Галерея лучших примеров</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Icon name="Check" className="text-green-400" size={20} />
                    <span>Бессрочный доступ</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg py-6 rounded-xl" size="lg">
                  <Icon name="CreditCard" className="mr-2" size={20} />
                  Оплатить через СБП
                </Button>
                <p className="text-xs text-center text-slate-500">
                  Безопасная оплата через Систему быстрых платежей
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Module Viewer Modal */}
      <Dialog open={activeModule !== null} onOpenChange={(open) => !open && setActiveModule(null)}>
        <DialogContent className="bg-slate-950 border-purple-500/30 max-w-7xl h-[90vh] p-0 overflow-hidden">
          {activeModule && (() => {
            const currentModule = modulesWithLessons.find(m => m.id === activeModule);
            if (!currentModule) return null;

            const currentLesson = selectedLesson?.moduleId === activeModule 
              ? currentModule.lessons.find(l => l.id === selectedLesson.lessonId)
              : currentModule.lessons[0];

            return (
              <div className="flex h-full">
                {/* Sidebar with lessons */}
                <div className="w-80 border-r border-purple-500/20 bg-slate-900/50 flex flex-col">
                  <div className="p-6 border-b border-purple-500/20">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mb-4 text-slate-400 hover:text-white"
                      onClick={() => setActiveModule(null)}
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Назад
                    </Button>
                    <h3 className="text-xl font-bold text-white mb-2">{currentModule.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Icon name="Video" size={14} />
                        {currentModule.lessons.length} уроков
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {currentModule.duration}
                      </span>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-2">
                      {currentModule.lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.has(`${activeModule}-${lesson.id}`);
                        const isActive = currentLesson?.id === lesson.id;
                        
                        return (
                          <Card
                            key={lesson.id}
                            className={`cursor-pointer transition-all ${
                              isActive 
                                ? 'bg-purple-600/20 border-purple-500' 
                                : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-purple-500/30'
                            }`}
                            onClick={() => setSelectedLesson({ moduleId: activeModule, lessonId: lesson.id })}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div 
                                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer ${
                                    isCompleted ? 'bg-green-500' : 'bg-slate-700'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonComplete(activeModule, lesson.id);
                                  }}
                                >
                                  {isCompleted && <Icon name="Check" size={14} className="text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-slate-500">Урок {index + 1}</span>
                                    <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                                      {lesson.duration}
                                    </Badge>
                                  </div>
                                  <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                    {lesson.title}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>

                {/* Main content area */}
                <div className="flex-1 flex flex-col">
                  {currentLesson && (
                    <>
                      {/* Video Player */}
                      <div className="relative bg-black aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-slate-900/20">
                          <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-purple-600/20 flex items-center justify-center mb-4 mx-auto hover-scale cursor-pointer">
                              <Icon name="Play" size={40} className="text-purple-400 ml-1" />
                            </div>
                            <p className="text-slate-400">Видеоплеер</p>
                            <p className="text-xs text-slate-500 mt-1">{currentLesson.duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 overflow-auto p-6 bg-slate-900/30">
                        <div className="max-w-4xl mx-auto">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h2 className="text-3xl font-bold text-white mb-2">{currentLesson.title}</h2>
                              <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {currentLesson.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Icon name="User" size={14} />
                                  Преподаватель
                                </span>
                              </div>
                            </div>
                            <Button
                              variant={completedLessons.has(`${activeModule}-${currentLesson.id}`) ? "default" : "outline"}
                              className={completedLessons.has(`${activeModule}-${currentLesson.id}`) 
                                ? "bg-green-600 hover:bg-green-700" 
                                : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                              }
                              onClick={() => toggleLessonComplete(activeModule, currentLesson.id)}
                            >
                              <Icon name="Check" size={16} className="mr-2" />
                              {completedLessons.has(`${activeModule}-${currentLesson.id}`) ? 'Пройдено' : 'Отметить пройденным'}
                            </Button>
                          </div>

                          <Card className="bg-slate-800/40 border-purple-500/20 mb-6">
                            <CardHeader>
                              <CardTitle className="text-white flex items-center gap-2">
                                <Icon name="FileText" size={20} className="text-purple-400" />
                                Описание урока
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-slate-300 leading-relaxed">{currentLesson.description}</p>
                            </CardContent>
                          </Card>

                          <div className="grid md:grid-cols-2 gap-4">
                            {currentModule.lessons
                              .filter(l => l.id !== currentLesson.id)
                              .slice(0, 2)
                              .map(nextLesson => (
                                <Card 
                                  key={nextLesson.id}
                                  className="bg-slate-800/40 border-purple-500/20 hover:border-purple-500/40 cursor-pointer hover-scale"
                                  onClick={() => setSelectedLesson({ moduleId: activeModule, lessonId: nextLesson.id })}
                                >
                                  <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Icon name="PlayCircle" size={16} className="text-purple-400" />
                                      <span className="text-xs text-slate-500">Следующий урок</span>
                                    </div>
                                    <p className="text-sm font-medium text-white mb-1">{nextLesson.title}</p>
                                    <p className="text-xs text-slate-400">{nextLesson.duration}</p>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;