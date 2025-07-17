import React, { useState } from 'react';
import { Calendar, MessageCircle, ChevronLeft, ChevronRight, ExternalLink, Loader, MoreHorizontal, ThumbsUp, ThumbsDown, Clock, Hash } from 'lucide-react';
import { mockKakaoMessages, getMoreNewsByDate } from '../data/mockData';
import { KakaoMessage, NewsItem } from '../types';
import Modal from './Modal';

const MyPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [moreNews, setMoreNews] = useState<NewsItem[]>([]);
  const [isMoreNewsModalOpen, setIsMoreNewsModalOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [feedbacks, setFeedbacks] = useState<{[key: string]: {keyword: 'like' | 'dislike' | null, quality: 'like' | 'dislike' | null}}>({});

  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockKakaoMessages.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMessages = mockKakaoMessages.slice(startIndex, endIndex);

  const handleMoreNews = async (date: string) => {
    setLoadingMore(true);
    setSelectedDate(date);
    
    // 시뮬레이션: API 호출
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const additionalNews = getMoreNewsByDate(date);
    setMoreNews(additionalNews);
    setLoadingMore(false);
    setIsMoreNewsModalOpen(true);
  };

  const closeMoreNewsModal = () => {
    setIsMoreNewsModalOpen(false);
    setSelectedDate(null);
    setMoreNews([]);
  };

  const handleFeedback = (newsId: string, type: 'keyword' | 'quality', value: 'like' | 'dislike') => {
    setFeedbacks(prev => ({
      ...prev,
      [newsId]: {
        ...prev[newsId],
        [type]: prev[newsId]?.[type] === value ? null : value
      }
    }));
    
    // 실제로는 여기서 API 호출하여 피드백 저장
    console.log(`News ${newsId} - ${type}: ${value}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ko-KR', {
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{formatDate(message.date)}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                     {formatTime(message.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex flex-wrap gap-2">
                  {message.keywords.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                      <Hash className="w-3 h-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* News Items */}
            <div className="space-y-4 mb-6">
              {message.news.map((news, index) => (
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
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-blue-700 transition-colors"
                      >
                        <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:underline leading-tight">
                          {news.title}
                        </h4>
                        
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2 hover:text-gray-800 leading-relaxed">
                          {news.description}
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
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-700 transition-colors"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:underline leading-tight">
                        {news.title}
                      </h4>
                      
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2 hover:text-gray-800 leading-relaxed">
                        {news.description}
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
                onClick={() => handleMoreNews(message.date)}
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
          총 {mockKakaoMessages.length}개 중 {startIndex + 1}-{Math.min(endIndex, mockKakaoMessages.length)}개 표시
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
        title={`${selectedDate ? formatDate(selectedDate) : ''} 추가 뉴스`}
      >
        <div className="space-y-4">
          {moreNews.map((news) => (
            <div key={news.id} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs text-gray-600 flex items-center bg-white px-2 py-1 rounded-lg border">
                      <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                      {formatTime(news.pubDate)}
                    </span>
                  </div>
                  
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-blue-700 transition-colors"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:underline leading-tight">
                      {news.title}
                    </h4>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 hover:text-gray-800 leading-relaxed">
                      {news.description}
                    </p>
                  </a>
                  
                  <div className="flex items-center justify-between">
                    <a
                      href={news.link}
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