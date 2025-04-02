import React from 'react';
import type { NewsItem } from '../App';
import { Megaphone, Calendar, UtensilsCrossed, Clock } from 'lucide-react';

type Props = {
  news: NewsItem[];
};

const categoryIcons = {
  '공지사항': Megaphone,
  '행사': Calendar,
  '급식메뉴': UtensilsCrossed,
  '일정변경': Clock,
};

const NewsDisplay: React.FC<Props> = ({ news }) => {
  const groupedNews = news.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<NewsItem['category'], NewsItem[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedNews).map(([category, items]) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons];
        return (
          <div key={category} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {category}
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-medium text-lg text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(item.timestamp).toLocaleString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsDisplay;