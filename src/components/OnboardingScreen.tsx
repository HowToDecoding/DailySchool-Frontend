import React from 'react';
import { School, Bell, Users } from 'lucide-react';

type Props = {
  onLogin: () => void;
};

const OnboardingScreen: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6">
          너만 모르는 학교 소식
          <br />
          이제 <span className="text-emerald-600">데일리스쿨</span>로 해결!
        </h1>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
          <div className="animate-bounce-slow">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center">
              <School className="w-10 h-10 md:w-12 md:h-12 text-emerald-600" />
            </div>
            <p className="mt-4 text-emerald-700 font-medium">실시간 학교 소식</p>
          </div>

          <div className="animate-bounce-slow animation-delay-200">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center">
              <Bell className="w-10 h-10 md:w-12 md:h-12 text-emerald-600" />
            </div>
            <p className="mt-4 text-emerald-700 font-medium">맞춤 알림 서비스</p>
          </div>

          <div className="animate-bounce-slow animation-delay-400">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-emerald-600" />
            </div>
            <p className="mt-4 text-emerald-700 font-medium">우리만의 소통 공간</p>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-emerald-700 transition transform hover:scale-105"
        >
          지금 시작하기
        </button>

        <p className="mt-8 text-gray-600">
          이미 가입하셨나요? <button onClick={onLogin} className="text-emerald-600 hover:underline">로그인하기</button>
        </p>
      </div>
    </div>
  );
};

export default OnboardingScreen;