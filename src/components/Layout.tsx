import React, { useEffect, useState } from 'react';
import { Settings, User, TrendingUp, List } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLoginClick: () => void;
}


const KAKAO_LOGIN_URL = import.meta.env.VITE_KAKAO_LOGIN_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.likelionnews.click';
const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange, onLoginClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const KAKAO_LOGIN_URL = import.meta.env.VITE_KAKAO_LOGIN_URL;

  // localStorage의 accessToken을 기준으로 로그인 상태를 동기화
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  // 로그인 상태가 변경되면 인증이 필요한 API 호출 (예시)
  useEffect(() => {
    if (!isLoggedIn) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch(`${API_BASE_URL}/api/auth/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`API 오류: ${res.status}`);
        }
        const data = await res.json();
        console.log('인증된 API 응답:', data);
      })
      .catch((err) => {
        console.error('인증 API 호출 실패:', err);
        // 예: 토큰 만료 등으로 로그아웃 처리 필요 시 여기서 처리
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('tokenProcessed');
      });
  }, [isLoggedIn]);

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('tokenProcessed');
    setIsLoggedIn(false); // 상태 즉시 반영

    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
    } catch (e) {
      console.warn('로그아웃 실패:', e);
    }
    window.location.reload(); // 로그아웃 후 새로고침
  };

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
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M12 3C6.486 3 2 6.262 2 10.5c0 2.665 1.708 5.033 4.358 6.442l-1.034 3.118c-.096.29.024.608.3.794.276.186.64.186.916 0L9.358 18.5H12c5.514 0 10-3.262 10-7.5S17.514 3 12 3z"/>
                  </svg>
                  <span>로그아웃</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    
                    window.location.href = KAKAO_LOGIN_URL;
                  }}
                  className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M12 3C6.486 3 2 6.262 2 10.5c0 2.665 1.708 5.033 4.358 6.442l-1.034 3.118c-.096.29.024.608.3.794.276.186.64.186.916 0L9.358 18.5H12c5.514 0 10-3.262 10-7.5S17.514 3 12 3z"/>
                  </svg>
                  <span>카카오 로그인</span>
                </button>
              )}
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
