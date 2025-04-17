import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getAccessToken, removeTokens } from '../services/authService';

// 사용자 타입 정의
export type User = {
  id?: string;
  email: string;
  name: string;
};

// 컨텍스트에서 제공할 값들의 타입 정의
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props 타입 정의
type AuthProviderProps = {
  children: ReactNode;
};

// 컨텍스트 제공자 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    removeTokens();
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          // 여기서 실제로는 토큰을 검증하고 사용자 정보를 가져오는 API 호출이 필요할 수 있습니다.
          // 예시에서는 토큰이 있으면 사용자가 인증된 것으로 간주합니다.
          // 실제 구현에서는 /me 같은 엔드포인트를 통해 사용자 정보를 조회하는 것이 좋습니다.
          setUser({
            email: "authenticated@user.com", // 실제로는 API 응답에서 가져옵니다
            name: "인증된 사용자" // 실제로는 API 응답에서 가져옵니다
          });
        } catch (error) {
          console.error("토큰 검증 실패:", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // 컨텍스트 값 구성
  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    setUser,
    logout
  };

  // 로딩 중에는 아무것도 렌더링하지 않거나 로딩 인디케이터를 표시할 수 있습니다.
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅 - 다른 컴포넌트에서 인증 컨텍스트에 쉽게 접근할 수 있도록 합니다.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
