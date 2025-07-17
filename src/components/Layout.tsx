import React from 'react';
import { Settings, User, TrendingUp, List } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLoginClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange, onLoginClick }) => {
  const menuItems = [
    { id: 'home', label: '홈', icon: TrendingUp },
    { id: 'mypage', label: '마이페이지', icon: List },
    { id: 'settings', label: '설정', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-2">
            <div className="flex items-center space-x-2">
       
              <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent hover:from-slate-900 hover:to-slate-700 transition-all duration-500 cursor-default whitespace-nowrap">
                멋쟁이 뉴스 배달부
              </h1>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => {
                  // 실제 카카오 로그인 URL로 리다이렉트
                  window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
                }}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
              >
                {/* 카카오 로고 SVG */}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="flex-shrink-0"
                >
                  <path d="M12 3C6.486 3 2 6.262 2 10.5c0 2.665 1.708 5.033 4.358 6.442l-1.034 3.118c-.096.29.024.608.3.794.276.186.64.186.916 0L9.358 18.5H12c5.514 0 10-3.262 10-7.5S17.514 3 12 3z"/>
                </svg>
                <span>카카오 로그인</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 py-4 px-3 border-b-3 font-semibold text-sm transition-all duration-200 ${
                    currentPage === item.id
                      ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                      : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;