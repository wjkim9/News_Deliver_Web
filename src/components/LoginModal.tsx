import React, { useState } from 'react';
import { MessageCircle, Shield, Clock, Bell, X, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    
    try {
      // 실제 카카오 로그인 로직이 들어갈 자리
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 로그인 성공 시 설정 페이지로 리다이렉트
      alert('카카오 로그인이 완료되었습니다!');
      onClose();
      
      // 설정 페이지로 리다이렉트 (실제로는 App.tsx에서 페이지 상태 변경)
      window.dispatchEvent(new CustomEvent('loginSuccess'));
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-60" onClick={onClose}></div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block w-full max-w-lg p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-2xl rounded-3xl border border-blue-500/20">
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="p-3 text-white hover:text-blue-100 transition-all duration-200 rounded-xl hover:bg-white/10 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 pb-8 -mt-2">
              {/* Logo Section */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/95 rounded-3xl shadow-2xl mb-6 overflow-hidden backdrop-blur-sm border border-white/20">
                  <img 
                    src="/src/assets/멋사.png" 
                    alt="멋쟁이 뉴스 배달부 로고" 
                    className="w-16 h-16 object-cover rounded-2xl"
                  />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                  <h1 className="text-4xl font-bold text-white">멋쟁이 뉴스 배달부</h1>
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-blue-100 text-lg font-medium">맞춤형 뉴스를 카카오톡으로 받아보세요</p>
              </div>

              {/* Login Card */}
              <div className="bg-white/95 rounded-3xl shadow-2xl p-10 backdrop-blur-sm border border-white/20">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">로그인</h2>
                  <p className="text-gray-700 text-lg">카카오톡으로 간편하게 시작하세요</p>
                </div>

                {/* Features */}
                <div className="space-y-5 mb-10">
                  <div className="flex items-center space-x-4 text-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-lg">매일 정해진 시간에 뉴스 알림</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-lg">관심 키워드 기반 맞춤 뉴스</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-lg">카카오톡으로 편리한 수신</span>
                  </div>
                </div>

                {/* Kakao Login Button */}
                <button
                  onClick={() => {
                    window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
                  }}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-5 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>로그인 중...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-6 h-6" />
                      <span>카카오 로그인</span>
                    </>
                  )}
                </button>

                {/* Terms */}
                <p className="text-sm text-gray-600 text-center mt-8 leading-relaxed font-medium">
                  로그인 시 <span className="text-blue-700 font-semibold">서비스 이용약관</span> 및{' '}
                  <span className="text-blue-700 font-semibold">개인정보처리방침</span>에 동의하게 됩니다.
                </p>
              </div>

              {/* Bottom Info */}
              <div className="text-center mt-8">
                <p className="text-blue-100 text-lg font-medium">
                  매일 새벽 3시에 업데이트되는 실시간 뉴스
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;