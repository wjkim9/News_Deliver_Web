import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import MyPage from './components/MyPage';
import SettingsPage from './components/SettingsPage';
import LoginModal from './components/LoginModal';
import { useEffect } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  /* 카카오 로그인 후 엑세스, 리프레시 토큰 분할 저장 로직직 */ 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      try {
        const tokenObj = JSON.parse(decodeURIComponent(token));
        if (tokenObj.accessToken) {
          localStorage.setItem("accessToken", tokenObj.accessToken);
        }
        if (tokenObj.refreshToken) {
          localStorage.setItem("refreshToken", tokenObj.refreshToken);
        }
        // 필요하다면 user 정보도 저장
        if (tokenObj.user) {
          localStorage.setItem("user", JSON.stringify(tokenObj.user));
        }
      } catch (e) {
        // 파싱 에러 처리
        console.error("토큰 파싱 오류:", e);
      }
      // URL에서 token 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // 로그인 성공 시 설정 페이지로 이동
  React.useEffect(() => {
    const handleLoginSuccess = () => {
      setCurrentPage('settings');
      setIsLoginModalOpen(false);
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);
    return () => window.removeEventListener('loginSuccess', handleLoginSuccess);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'mypage':
        return <MyPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage} onLoginClick={handleLoginClick}>
        {renderPage()}
      </Layout>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

export default App;