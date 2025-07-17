import React, { useState } from 'react';
import { Calendar as CalendarIcon, ExternalLink, Tag, Image, Loader } from 'lucide-react';
import { mockNewsDeliveries } from '../data/mockData';
import { NewsDelivery, NewsItem } from '../types';
import Modal from './Modal';

const NewsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatingImage, setGeneratingImage] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get delivery dates for highlighting
  const deliveryDates = mockNewsDeliveries.map(delivery => delivery.date);

  const handleDateClick = (date: string) => {
    const delivery = mockNewsDeliveries.find(d => d.date === date);
    if (delivery) {
      setSelectedNews(delivery.news);
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedNews([]);
  };

  const handleGenerate4Cut = async (newsId: string) => {
    setGeneratingImage(newsId);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratingImage(null);
    alert('4컷 이미지가 생성되었습니다!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateStr = current.toISOString().split('T')[0];
      const isCurrentMonth = current.getMonth() === month;
      const hasDelivery = deliveryDates.includes(dateStr);
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      
      days.push({
        date: new Date(current),
        dateStr,
        isCurrentMonth,
        hasDelivery,
        isToday
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const calendarDays = generateCalendarDays();
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">뉴스 캘린더</h1>
          <p className="text-gray-600 mt-1">뉴스 전송 기록을 확인하세요</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
          >
            ← 이전
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
          >
            다음 →
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div key={day} className={`p-3 text-center text-sm font-medium ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
            }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              onClick={() => day.hasDelivery && handleDateClick(day.dateStr)}
              className={`
                relative p-3 text-center text-sm rounded-lg transition-all min-h-[48px] flex flex-col items-center justify-center
                ${!day.isCurrentMonth ? 'text-gray-300' : 
                  day.isToday ? 'bg-blue-500 text-white font-bold' :
                  day.hasDelivery ? 'text-gray-700 hover:bg-gray-100 cursor-pointer font-medium' : 
                  'text-gray-700 hover:bg-gray-50'}
                ${!day.hasDelivery && !day.isToday ? 'cursor-default' : ''}
              `}
            >
              <span className="text-sm">{day.date.getDate()}</span>
              {day.hasDelivery && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
              {day.isToday && !day.hasDelivery && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>뉴스 전송일</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span>오늘</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{deliveryDates.length}</div>
              <div className="text-sm text-green-700">총 전송일</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{deliveryDates.length * 5}</div>
              <div className="text-sm text-blue-700">총 전송 뉴스</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">98.5%</div>
              <div className="text-sm text-purple-700">전송 성공률</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Date News */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${selectedDate ? new Date(selectedDate).toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }) : ''} 전송된 뉴스`}
      >
        <div className="space-y-4">
          {selectedNews.map((news) => (
            <div key={news.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-start space-x-4">
                {news.imageUrl && (
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Tag className="w-3 h-3 mr-1" />
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {formatDate(news.pubDate)}
                    </span>
                  </div>
                  
                  <h4 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h4>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {news.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      원문 보기
                    </a>
                    
                    <button
                      onClick={() => handleGenerate4Cut(news.id)}
                      disabled={generatingImage === news.id}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {generatingImage === news.id ? (
                        <>
                          <Loader className="w-3 h-3 mr-1 animate-spin" />
                          생성 중...
                        </>
                      ) : (
                        <>
                          <Image className="w-3 h-3 mr-1" />
                          4컷 이미지화
                        </>
                      )}
                    </button>
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

export default NewsPage;