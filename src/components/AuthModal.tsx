import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { signIn, signUp } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  
  const { setUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // 로그인 처리
        const response = await signIn(formData.email, formData.password);
        
        // 사용자 정보 설정
        setUser({
          email: formData.email,
          name: response.data?.name || '사용자', // API 응답에 사용자 이름이 있으면 사용
        });
        
        toast.success('로그인되었습니다.');
        onClose();
      } else {
        // 회원가입 처리
        await signUp(formData.email, formData.name, formData.password);
        toast.success('회원가입이 완료되었습니다. 이제 로그인하세요.');
        // 회원가입 후 로그인 폼으로 전환
        setIsLogin(true);
      }
    } catch (error: unknown) {
      // 에러 메시지 표시
      let errorMessage = isLogin ? '로그인에 실패했습니다.' : '회원가입에 실패했습니다.';
      
      // Type guard to safely access error properties
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { 
          response?: { 
            data?: { 
              message?: string 
            } 
          } 
        };
        
        if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-2xl font-semibold text-emerald-800 mb-6">
          {isLogin ? '로그인' : '회원가입'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
              disabled={isLoading}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition"
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-emerald-600 hover:text-emerald-700"
            disabled={isLoading}
          >
            {isLogin ? '회원가입하기' : '로그인하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;