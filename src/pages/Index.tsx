import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    if (!email) {
      toast({
        title: 'Ошибка',
        description: 'Укажите email для получения доступа',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Реквизиты для оплаты',
      description: 'Карта: 2204 3203 2286 7617 | После оплаты напишите на почту с подтверждением',
    });
  };

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
        'Double exposure portrait, nature elements overlay, artistic composition, dreamy atmosphere',
        'Black and white portrait, high contrast, dramatic lighting, emotional depth, classic photography',
        'Street style portrait, urban environment, natural pose, authentic moment, photojournalistic approach'
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
        'Creative workspace, artistic tools, inspiring setup, soft lighting, aesthetic arrangement',
        'Evening routine, candles and bath, self-care moment, relaxing atmosphere, spa vibes',
        'Weekend market visit, fresh produce, vibrant colors, authentic lifestyle, documentary style'
      ]
    },
    {
      category: 'Fashion',
      prompts: [
        'High fashion editorial, avant-garde clothing, dramatic pose, runway inspired, Vogue style',
        'Street style fashion, casual chic, urban background, effortless elegance, contemporary look',
        'Luxury brand campaign, sophisticated styling, elegant setting, premium aesthetic, refined details',
        'Boho fashion shoot, flowing fabrics, natural setting, free-spirited vibe, earthy tones',
        'Monochrome fashion, all black ensemble, architectural location, minimalist styling, modern edge',
        'Vintage fashion revival, retro styling, period-appropriate setting, nostalgic atmosphere',
        'Athleisure trend, sporty-chic combination, active lifestyle, comfortable fashion, modern athletic',
        'Evening gown editorial, glamorous styling, dramatic lighting, red carpet worthy, haute couture',
        'Sustainable fashion, eco-friendly materials, natural background, conscious style, ethical aesthetic',
        'Accessory focus shoot, jewelry and bags spotlight, clean background, product emphasis, commercial ready'
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
        'Restaurant food photography, appetizing presentation, mood lighting, culinary artistry',
        'Tech product launch, sleek device, modern environment, innovation focused, cutting-edge aesthetic',
        'Beauty product campaign, fresh and clean, natural skin, dewy finish, aspirational beauty'
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
        'Street art meets photography, urban culture, graffiti elements, contemporary edge',
        'Surrealist composition, dreamlike imagery, impossible scenarios, Salvador Dali inspired',
        'Photorealism art, hyper-detailed, lifelike quality, technical mastery, contemporary realism'
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
              Создавай трендовые AI-фотографии и зарабатывай от 30 000 ₽/месяц
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 rounded-xl shadow-xl hover-scale">
                    <Icon name="Zap" className="mr-2" size={20} />
                    Купить курс за 2 990 ₽
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-800">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-purple-300">Оплата курса</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      После оплаты вы получите доступ ко всем материалам навсегда
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email для доступа</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-300">Телефон (опционально)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-300">Реквизиты для оплаты</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm text-slate-400 mb-1">Номер карты:</p>
                          <div className="flex items-center gap-2">
                            <code className="text-lg text-white bg-slate-900 px-3 py-2 rounded font-mono flex-1">
                              2204 3203 2286 7617
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600"
                              onClick={() => {
                                navigator.clipboard.writeText('2204320322867617');
                                toast({ title: 'Скопировано!', description: 'Номер карты скопирован в буфер обмена' });
                              }}
                            >
                              <Icon name="Copy" size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                          <p className="text-sm text-amber-300">
                            <Icon name="AlertCircle" className="inline mr-1" size={14} />
                            После оплаты отправьте скриншот на <strong>your@email.com</strong> с указанием вашего email
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Button 
                      onClick={handlePayment} 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Я оплатил(а)
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap gap-6 justify-center text-slate-300">
              <div className="flex items-center gap-2">
                <Icon name="Video" size={20} className="text-purple-400" />
                <span>30 видеоуроков</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={20} className="text-purple-400" />
                <span>12 часов контента</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Infinity" size={20} className="text-purple-400" />
                <span>Бессрочный доступ</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Gift" size={20} className="text-purple-400" />
                <span>50 готовых промтов</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-300">
            Программа курса
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {modules.map((module, index) => (
              <Card
                key={module.id}
                className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer hover-scale"
                onClick={() => setActiveModule(module.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <Icon name={module.icon as any} size={24} className="text-purple-400" />
                    </div>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                      Модуль {index + 1}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-purple-300 mb-2">{module.title}</CardTitle>
                  <CardDescription className="text-slate-400">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="PlayCircle" size={16} />
                      <span>{module.lessons} уроков</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.slice(0, 2).map((topic, i) => (
                      <Badge key={i} variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeModule && (
            <Card className="bg-slate-800/70 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-300">
                  {modulesWithLessons.find(m => m.id === activeModule)?.title}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {modulesWithLessons.find(m => m.id === activeModule)?.lessons.length} уроков
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {modulesWithLessons.find(m => m.id === activeModule)?.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-all cursor-pointer"
                      onClick={() => setSelectedLesson({ moduleId: activeModule, lessonId: lesson.id })}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-200">{lesson.title}</h4>
                        <p className="text-sm text-slate-400">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {lesson.duration}
                        </span>
                        <Button
                          size="sm"
                          variant={completedLessons.has(`${activeModule}-${lesson.id}`) ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonComplete(activeModule, lesson.id);
                          }}
                          className="text-xs"
                        >
                          {completedLessons.has(`${activeModule}-${lesson.id}`) ? (
                            <><Icon name="CheckCircle" size={14} className="mr-1" /> Пройдено</>
                          ) : (
                            <><Icon name="Circle" size={14} className="mr-1" /> Отметить</>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Prompt Library */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              🎁 Бонус при покупке
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-purple-300">
              Библиотека из 50 промтов
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Готовые промты для создания профессиональных AI-фотографий. Копируй, адаптируй и создавай шедевры!
            </p>
          </div>

          <Tabs defaultValue="Портреты" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-slate-800 mb-8">
              {promptLibrary.map((category) => (
                <TabsTrigger
                  key={category.category}
                  value={category.category}
                  className="data-[state=active]:bg-purple-600"
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {promptLibrary.map((category) => (
              <TabsContent key={category.category} value={category.category}>
                <div className="grid gap-4">
                  {category.prompts.map((prompt, index) => (
                    <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Badge className="bg-purple-500/20 text-purple-300 shrink-0">
                            #{index + 1}
                          </Badge>
                          <p className="text-slate-300 flex-1 font-mono text-sm">{prompt}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="shrink-0 border-slate-600"
                            onClick={() => {
                              navigator.clipboard.writeText(prompt);
                              toast({
                                title: "Скопировано!",
                                description: "Промт скопирован в буфер обмена",
                              });
                            }}
                          >
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-purple-200">
            Начни создавать уже сегодня
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Бессрочный доступ ко всем материалам, обновлениям и комьюнити
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-100 text-lg px-8 py-6 rounded-xl shadow-xl hover-scale">
                Получить доступ за 2 990 ₽
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800">
              <DialogHeader>
                <DialogTitle className="text-2xl text-purple-300">Оплата курса</DialogTitle>
                <DialogDescription className="text-slate-400">
                  После оплаты вы получите доступ ко всем материалам навсегда
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email2" className="text-slate-300">Email для доступа</Label>
                  <Input
                    id="email2"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-300">Реквизиты для оплаты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Номер карты:</p>
                      <div className="flex items-center gap-2">
                        <code className="text-lg text-white bg-slate-900 px-3 py-2 rounded font-mono flex-1">
                          2204 3203 2286 7617
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600"
                          onClick={() => {
                            navigator.clipboard.writeText('2204320322867617');
                            toast({ title: 'Скопировано!', description: 'Номер карты скопирован в буфер обмена' });
                          }}
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                      <p className="text-sm text-amber-300">
                        <Icon name="AlertCircle" className="inline mr-1" size={14} />
                        После оплаты отправьте скриншот на <strong>your@email.com</strong> с указанием вашего email
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Button 
                  onClick={handlePayment} 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Я оплатил(а)
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 2025 Нейрофотосессия. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
