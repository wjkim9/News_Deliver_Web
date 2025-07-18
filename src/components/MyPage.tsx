import React, { useState } from 'react';
import { Calendar, MessageCircle, ChevronLeft, ChevronRight, ExternalLink, Loader, MoreHorizontal, ThumbsUp, ThumbsDown, Clock, Hash } from 'lucide-react';
import { getMoreNewsByDate } from '../data/mockData';
import { KakaoMessage, NewsItem } from '../types';
import Modal from './Modal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 키워드 피드백 API 호출 함수
const sendKeywordFeedback = async (historyId: number, item: string, feedbackValue: number) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await fetch(`${API_BASE_URL}/sub/feedback/keyword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      historyId,
      item,
      feedbackValue
    }),
  });

  if (!response.ok) {
    throw new Error('피드백 전송에 실패했습니다.');
  }

  const data = await response.json();
  return data.data; // Long 값 반환 (1, -1, 0, null)
};

// 컨텐츠 품질 피드백 API 호출 함수
const sendContentQualityFeedback = async (historyId: number, item: string, feedbackValue: number) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await fetch(`${API_BASE_URL}/sub/feedback/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      historyId,
      item,
      feedbackValue
    }),
  });

  if (!response.ok) {
    throw new Error('피드백 전송에 실패했습니다.');
  }

  const data = await response.json();
  return data.data; // Long 값 반환 (1, -1, 0, null)
};

const MyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0); // 필요시 사용
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moreNews, setMoreNews] = useState<NewsItem[]>([]);
  const [isMoreNewsModalOpen, setIsMoreNewsModalOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [feedbacks, setFeedbacks] = useState<{[key: string]: {keyword: 'like' | 'dislike' | null, quality: 'like' | 'dislike' | null}}>({});

  const itemsPerPage = 3;
  const currentMessages = messages;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  // API에서 히스토리 불러오기
  React.useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const res = await fetch(`${API_BASE_URL}/sub/history?page=${currentPage-1}&size=${itemsPerPage}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          }
        });
        if (res.ok) {
          const data = await res.json();
          console.log('=== 히스토리 API 응답 구조 분석 ===');
          console.log('전체 API 응답:', data);
          console.log('data.data 타입:', typeof data.data);
          console.log('data.data 길이:', data.data?.length);
          
          if (data.data && data.data.length > 0) {
            const firstMessage = data.data[0];
            console.log('첫 번째 메시지:', firstMessage);
            console.log('첫 번째 메시지의 모든 키:', Object.keys(firstMessage));
            
            // 각 키와 값을 출력
            Object.entries(firstMessage).forEach(([key, value]) => {
              console.log(`${key}: ${value} (타입: ${typeof value})`);
            });
            
            if (firstMessage.newsList && firstMessage.newsList.length > 0) {
              const firstNews = firstMessage.newsList[0];
              console.log('첫 번째 뉴스:', firstNews);
              console.log('첫 번째 뉴스의 모든 키:', Object.keys(firstNews));
            }
          }
          
          setMessages(data.data || []);
        } else {
          console.error('히스토리 API 호출 실패:', res.status, res.statusText);
          setMessages([]);
        }
      } catch (error) {
        console.error('히스토리 API 호출 중 오류:', error);
        setMessages([]);
      }
    };
    fetchHistory();
  }, [currentPage]);
  
  const handleMoreNews = async (historyId: number) => {
    setLoadingMore(true);
    setIsMoreNewsModalOpen(true);
    setMoreNews([]);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API_BASE_URL}/sub/history/${historyId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMoreNews(data.data || []);
      } else {
        setMoreNews([]);
      }
    } catch {
      setMoreNews([]);
    }
    setLoadingMore(false);
  };

  const closeMoreNewsModal = () => {
    setIsMoreNewsModalOpen(false);
    setSelectedDate(null);
    setMoreNews([]);
  };

  const handleFeedback = async (newsId: string, type: 'keyword' | 'quality', value: 'like' | 'dislike') => {
    // 키워드 피드백과 데이터 품질 피드백 모두 API 호출
    try {
      // 현재 메시지에서 historyId와 키워드 찾기
      const currentMessage = messages.find(message => 
        message.newsList && message.newsList.some((news: any) => news.id === newsId)
      );
      
      console.log('현재 메시지:', currentMessage);
      console.log('newsId:', newsId);
      
      if (currentMessage) {
        const news = currentMessage.newsList.find((news: any) => news.id === newsId);
        console.log('찾은 뉴스:', news);
        
        if (news) {
          // historyId는 개별 뉴스의 id를 사용
          const historyId = news.id;
          
          console.log('사용할 historyId (뉴스 ID):', historyId);
          console.log('뉴스 제목:', news.newsTitle);
          
          // item 값은 피드백 타입을 구분하는 값
          const itemValue = type === 'keyword' ? 'keyword_reflection' : 'content_quality';
          
          console.log('사용할 item 값 (피드백 타입):', itemValue);
          
          // 현재 피드백 상태 확인
          const currentFeedback = feedbacks[newsId]?.[type];
          let feedbackValue: number;
          
          // 같은 값이면 취소(0), 다르면 새 값
          if (currentFeedback === value) {
            feedbackValue = 0; // 취소
          } else {
            feedbackValue = value === 'like' ? 1 : -1;
          }
          
          console.log('전송할 피드백 값:', feedbackValue);
          
          // 피드백 타입에 따라 적절한 API 호출
          let result: number;
          if (type === 'keyword') {
            result = await sendKeywordFeedback(
              historyId, // 개별 뉴스의 id
              itemValue, // 피드백 타입
              feedbackValue
            );
          } else {
            result = await sendContentQualityFeedback(
              historyId, // 개별 뉴스의 id
              itemValue, // 피드백 타입
              feedbackValue
            );
          }
          
          // 응답값에 따라 UI 상태 업데이트
          let newFeedbackState: 'like' | 'dislike' | null = null;
          if (result === 1) {
            newFeedbackState = 'like';
          } else if (result === -1) {
            newFeedbackState = 'dislike';
          } else {
            newFeedbackState = null; // 0 또는 null
          }
          
          setFeedbacks(prev => ({
            ...prev,
            [newsId]: {
              ...prev[newsId],
              [type]: newFeedbackState
            }
          }));
          
          console.log(`${type} 피드백 전송 완료: ${itemValue} - ${feedbackValue} -> ${result}`);
        } else {
          console.error('해당 newsId를 가진 뉴스를 찾을 수 없습니다:', newsId);
          alert('피드백을 처리할 수 없습니다.');
        }
      } else {
        console.error('해당 newsId를 가진 메시지를 찾을 수 없습니다:', newsId);
        alert('피드백을 처리할 수 없습니다.');
      }
    } catch (error) {
      console.error('피드백 전송 실패:', error);
      alert('피드백 전송에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const FeedbackButtons: React.FC<{newsId: string, isMobile?: boolean}> = ({ newsId, isMobile = false }) => {
    const feedback = feedbacks[newsId] || { keyword: null, quality: null };
    
    if (isMobile) {
      return (
        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
              <Hash className="w-3 h-3 mr-1" />
              키워드 반영도
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handleFeedback(newsId, 'keyword', 'like')}
                className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  feedback.keyword === 'like' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleFeedback(newsId, 'keyword', 'dislike')}
                className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  feedback.keyword === 'dislike' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              데이터 품질
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handleFeedback(newsId, 'quality', 'like')}
                className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  feedback.quality === 'like' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleFeedback(newsId, 'quality', 'dislike')}
                className={`flex-1 flex items-center justify-center px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  feedback.quality === 'dislike' 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-3">
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
            <Hash className="w-3 h-3 mr-1" />
            키워드 반영도
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handleFeedback(newsId, 'keyword', 'like')}
              className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                feedback.keyword === 'like' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFeedback(newsId, 'keyword', 'dislike')}
              className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                feedback.keyword === 'dislike' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            데이터 품질
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => handleFeedback(newsId, 'quality', 'like')}
              className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                feedback.quality === 'like' 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFeedback(newsId, 'quality', 'dislike')}
              className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                feedback.quality === 'dislike' 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600 text-lg">카카오톡으로 받은 뉴스 메시지를 확인하세요</p>
        </div>
        
        {/* Stats */}
      
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {currentMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
            {/* Message Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="text-gray-900"
                  >
                    <path d="M12 3C6.486 3 2 6.262 2 10.5c0 2.665 1.708 5.033 4.358 6.442l-1.034 3.118c-.096.29.024.608.3.794.276.186.64.186.916 0L9.358 18.5H12c5.514 0 10-3.262 10-7.5S17.514 3 12 3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{formatDate(message.publishedAt)}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                     {formatTime(message.publishedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-wrap gap-2">
                  {(message.settingKeyword ? message.settingKeyword.split(',') : []).map((keyword: string, index: number) => (
                    <span key={keyword + '-' + index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      <Hash className="w-3 h-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* News Items */}
            <div className="space-y-4 mb-6">
              {(message.newsList || []).map((news: any, index: number) => (
                <div key={news.id} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200">
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full">
                          {index + 1}
                        </span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border">
                          뉴스 #{index + 1}
                        </span>
                      </div>
                      <a
                        href={news.content_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-blue-700 transition-colors"
                      >
                        <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:underline leading-tight">
                          {news.newsTitle}
                        </h4>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2 hover:text-gray-800 leading-relaxed">
                          {news.summary}
                        </p>
                      </a>
                    </div>
                    {/* Desktop Feedback Buttons */}
                    <div className="flex-shrink-0 ml-6">
                      <FeedbackButtons newsId={news.id} />
                    </div>
                  </div>
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-lg border">
                        뉴스 #{index + 1}
                      </span>
                    </div>
                    <a
                      href={news.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-700 transition-colors"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:underline leading-tight">
                        {news.newsTitle}
                      </h4>
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2 hover:text-gray-800 leading-relaxed">
                        {news.summary}
                      </p>
                    </a>
                    {/* Mobile Feedback Buttons */}
                    <FeedbackButtons newsId={news.id} isMobile={true} />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button - Only More News */}
            <div className="flex items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => handleMoreNews((message.newsList && message.newsList[0]?.id) || message.settingId)}
                disabled={loadingMore}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
              >
                {loadingMore ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>로딩 중...</span>
                  </>
                ) : (
                  <>
                    <MoreHorizontal className="w-5 h-5" />
                    <span>더보기</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-700 font-medium">
          {messages.length > 0 ? `총 ${messages.length}개 표시` : '표시할 히스토리가 없습니다.'}
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 sm:p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-1">
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
              
              // Adjust start page if we're near the end
              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }
              
              // First page and ellipsis
              if (startPage > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pages.push(
                    <span key="ellipsis1" className="px-2 py-2 text-gray-500 text-sm">
                      ...
                    </span>
                  );
                }
              }
              
              // Visible pages
              for (let page = startPage; page <= endPage; page++) {
                pages.push(
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              
              // Last page and ellipsis
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pages.push(
                    <span key="ellipsis2" className="px-2 py-2 text-gray-500 text-sm">
                      ...
                    </span>
                  );
                }
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex-shrink-0 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {totalPages}
                  </button>
                );
              }
              
              return pages;
            })()}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 sm:p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* More News Modal */}
      <Modal
        isOpen={isMoreNewsModalOpen}
        onClose={closeMoreNewsModal}
        title={`추가 뉴스`}
      >
        <div className="space-y-4">
          {moreNews.map((news: any) => (
            <div key={news.id} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-gray-600 flex items-center bg-white px-2 py-1 rounded-lg border">
                      <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                      {formatTime(news.published_at)}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{news.publisher}</span>
                  </div>
                  <a
                    href={news.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-blue-700 transition-colors"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:underline leading-tight">
                      {news.title}
                    </h4>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 hover:text-gray-800 leading-relaxed">
                      {news.summary}
                    </p>
                  </a>
                  <div className="flex items-center justify-between">
                    <a
                      href={news.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      원문 보기
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default MyPage;