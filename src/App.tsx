import React, { useState } from 'react';
import { Mail, MenuSquare, Calendar, Clock, UtensilsCrossed, UserCircle, School, Bell, Users } from 'lucide-react';
import NewsSubmissionForm from './components/NewsSubmissionForm';
import NewsDisplay from './components/NewsDisplay';
import EmailNewsletter from './components/EmailNewsletter';
import AuthModal from './components/AuthModal';
import OnboardingScreen from './components/OnboardingScreen';
import { Toaster } from 'react-hot-toast';

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  category: '공지사항' | '행사' | '급식메뉴' | '일정변경';
  timestamp: Date;
};

export type User = {
  id: string;
  email: string;
  name: string;
};

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeTab, setActiveTab] = useState<'submit' | 'view' | 'email'>('view');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const addNews = (newsItem: Omit<NewsItem, 'id' | 'timestamp'>) => {
    setNews([
      ...news,
      {
        ...newsItem,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <Toaster position="top-right" />
      <nav className="bg-emerald-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MenuSquare className="h-6 w-6" />
            <span className="hidden sm:inline">데일리스쿨</span>
            <span className="sm:hidden">소식통</span>
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <>
                <button
                  onClick={() => setActiveTab('submit')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === 'submit'
                      ? 'bg-emerald-700'
                      : 'hover:bg-emerald-500'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  글쓰기
                </button>
                <button
                  onClick={() => setActiveTab('view')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === 'view'
                      ? 'bg-emerald-700'
                      : 'hover:bg-emerald-500'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  소식보기
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === 'email'
                      ? 'bg-emerald-700'
                      : 'hover:bg-emerald-500'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  뉴스레터
                </button>
                <div className="flex items-center gap-2 px-4 py-2">
                  <UserCircle className="h-5 w-5" />
                  <span>{user.name}님</span>
                  <button
                    onClick={() => setUser(null)}
                    className="ml-2 text-sm hover:underline"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-500 transition"
              >
                <UserCircle className="h-4 w-4" />
                로그인
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-emerald-500 rounded-lg transition"
          >
            <MenuSquare className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setActiveTab('submit');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === 'submit'
                      ? 'bg-emerald-700'
                      : 'hover:bg-emerald-500'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  글쓰기
                </button>
                <button
                  onClick={() => {
                    setActiveTab('view');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === 'view'
                      ? 'bg-emerald-700'
                      : 'hover:bg-emerald-500'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  소식보기
                </button>
                <button
                  onClick={() => {
                    setActiveTab('email');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === 'email'
                      ? 'bg-emerald-700'
                      : 'hover:bg-emerald-500'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  뉴스레터
                </button>
                <div className="flex items-center justify-between px-4 py-2 bg-emerald-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    <span>{user.name}님</span>
                  </div>
                  <button
                    onClick={() => {
                      setUser(null);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm hover:underline"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-500 transition"
              >
                <UserCircle className="h-4 w-4" />
                로그인
              </button>
            )}
          </div>
        )}
      </nav>

      <main className="container mx-auto py-8 px-4">
        {!user ? (
          <OnboardingScreen onLogin={() => setIsAuthModalOpen(true)} />
        ) : (
          <>
            {activeTab === 'submit' && <NewsSubmissionForm onSubmit={addNews} />}
            {activeTab === 'view' && <NewsDisplay news={news} />}
            {activeTab === 'email' && <EmailNewsletter news={news} />}
          </>
        )}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(user) => {
          setUser(user);
          setIsAuthModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;