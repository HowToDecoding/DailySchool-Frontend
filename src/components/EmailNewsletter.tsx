import React from 'react';
import type { NewsItem } from '../App';
import { Mail } from 'lucide-react';

type Props = {
  news: NewsItem[];
};

const EmailNewsletter: React.FC<Props> = ({ news }) => {
  const todayNews = news.filter(
    (item) => new Date(item.timestamp).toDateString() === new Date().toDateString()
  );

  const groupedNews = todayNews.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<NewsItem['category'], NewsItem[]>);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800 flex items-center gap-2">
          <Mail className="h-6 w-6" />
          일간 뉴스레터
        </h2>
        <p className="text-gray-600">
          {new Date().toLocaleDateString('ko-KR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="space-y-6">
          {Object.entries(groupedNews).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-medium text-emerald-700 border-b border-emerald-200 pb-2">
                {category}
              </h3>
              <ul className="mt-4 space-y-4">
                {items.map((item) => (
                  <li key={item.id}>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">
          이 뉴스레터는 학교 소식통에서 자동으로 생성되었습니다.
          자세한 내용은 웹사이트를 방문해주세요.
        </p>
      </div>
    </div>
  );
};

export default EmailNewsletter;