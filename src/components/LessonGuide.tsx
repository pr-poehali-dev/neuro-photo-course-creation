import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

interface LessonGuideProps {
  moduleId: number;
  lessonId: number;
  onClose: () => void;
}

const LessonGuide = ({ moduleId, lessonId, onClose }: LessonGuideProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGuide = async () => {
      setLoading(true);
      try {
        let guidePath = '';
        
        // Определяем путь к гайду
        if (moduleId === 1 && lessonId <= 2) {
          guidePath = `/guides/module1-lesson${lessonId}.md`;
        } else if (moduleId === 1 && lessonId === 3) {
          guidePath = `/guides/module1-lesson3.md`;
        } else if (moduleId === 1 && lessonId === 4) {
          guidePath = `/guides/module1-lesson4.md`;
        } else if (moduleId === 1 && lessonId >= 5) {
          guidePath = `/guides/module1-lessons-5-8.md`;
        } else if (moduleId === 2) {
          guidePath = `/guides/module2-all-lessons.md`;
        } else if (moduleId === 3) {
          guidePath = `/guides/module3-all-lessons.md`;
        }

        const response = await fetch(guidePath);
        if (!response.ok) throw new Error('Guide not found');
        
        const text = await response.text();
        
        // Если это файл с несколькими уроками, извлекаем нужный
        if (guidePath.includes('all-lessons') || guidePath.includes('lessons-5-8')) {
          const lessons = text.split(/^## Урок /gm);
          if (moduleId === 1 && lessonId >= 5) {
            const lessonIndex = lessonId - 4; // 5->1, 6->2, etc
            setContent(lessons[lessonIndex] ? `## Урок ${lessons[lessonIndex]}` : lessons[0]);
          } else {
            setContent(lessons[lessonId] ? `## Урок ${lessons[lessonId]}` : lessons[0]);
          }
        } else {
          setContent(text);
        }
      } catch (error) {
        setContent(`# Гайд временно недоступен\n\nИдёт работа над материалами урока. Скоро всё будет готово!`);
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, [moduleId, lessonId]);

  return (
    <Card className="bg-slate-900 border-slate-800 max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-purple-300">
          Модуль {moduleId}, Урок {lessonId}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Icon name="Loader" className="animate-spin text-purple-400" size={32} />
            </div>
          ) : (
            <div className="prose prose-invert prose-purple max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-purple-300 mb-6">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-purple-400 mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-slate-200 mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2">{children}</ol>
                  ),
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    return isBlock ? (
                      <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto mb-4">
                        <code className="text-sm text-slate-200">{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-slate-800 px-2 py-1 rounded text-purple-300">{children}</code>
                    );
                  },
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full border-collapse border border-slate-700">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left text-purple-300">{children}</th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-slate-700 px-4 py-2 text-slate-300">{children}</td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic text-slate-400 my-4">{children}</blockquote>
                  ),
                  hr: () => <hr className="border-slate-700 my-8" />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LessonGuide;
