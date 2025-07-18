import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, ExternalLink, Calendar, TrendingUp, Award } from 'lucide-react';
import { getNewsByTopic } from '../data/mockData';
import { NewsItem } from '../types';
import Modal from './Modal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage: React.FC = () => {
  const [hotTopics, setHotTopics] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicNews, setTopicNews] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 핫토픽 API 호출
  useEffect(() => {
    const fetchHotTopics = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/hottopic`);
        if (res.ok) {
          const data = await res.json();
          setHotTopics(data);
        } else {
          setHotTopics([]);
        }
      } catch {
        setHotTopics([]);
      }
    };
    fetchHotTopics();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-topic-item]');
    elements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        elements.forEach(el => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, [hotTopics]);

  const handleTopicClick = async (keyword: string) => {
    setIsModalOpen(true);
    setSelectedTopic(keyword);
    setTopicNews([]); // 로딩 전 초기화

    try {
      const res = await fetch(`${API_BASE_URL}/api/hottopic/${encodeURIComponent(keyword)}`);
      if (res.ok) {
        const data = await res.json();
        setTopicNews(data);
      } else {
        setTopicNews([]);
      }
    } catch {
      setTopicNews([]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTopic(null);
    setTopicNews([]);
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

  return (
    <div className="space-y-8">
      {/* Hero Section with Stats */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl p-8 text-white shadow-xl border border-blue-700/20">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:space-x-8">
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🔥</span>
              </div>
              <h1 className="text-3xl font-bold">어제의 Hot Topic TOP 10</h1>
            </div>
            <p className="text-blue-100 text-lg mb-6">실시간으로 수집된 뉴스 데이터를 기반으로 한 인기 토픽</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-3 h-3" />
                </div>
                <span>매일 3~8만개의 국내 뉴스 자동 수집</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
                  <Users className="w-3 h-3" />
                </div>
                <span>국내 150개 언론사 분석</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hot Topics List */}
      <div className="flex flex-col gap-6">
        {hotTopics.map((topic, index) => (
          <div
            key={topic.topicRank}
            id={`topic-${topic.topicRank}`}
            data-topic-item
            onClick={() => handleTopicClick(topic.keyword)}
            className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 cursor-pointer transition-all duration-500 transform ${
              visibleItems.has(`topic-${topic.topicRank}`)
                ? 'hover:shadow-lg hover:shadow-blue-100/50 hover:border-blue-200 hover:-translate-y-1 hover:scale-105 opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${
                    index < 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                    index < 6 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 
                    'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}
                >
                  {index < 3 ? <Award className="w-5 h-5" /> : topic.topicRank}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{topic.keyword}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      index < 3 ? 'bg-yellow-100 text-yellow-800' :
                      index < 6 ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      #{topic.topicRank}위
                    </span>
                    <span className="text-sm text-gray-500">트렌딩</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-700">{topic.keywordCount.toLocaleString()}</div>
                <div className="text-sm text-gray-500 font-medium">관련 뉴스</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Topic News - removed images and category tags */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`"${selectedTopic}" 관련 뉴스`}
      >
        <div className="space-y-4">
          {topicNews.length > 0 ? (
            topicNews.map((news) => (
              <div key={news.id} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-gray-600 flex items-center bg-white px-2 py-1 rounded-lg border">
                        <Calendar className="w-3 h-3 mr-1 text-blue-500" />
                        {news.published_at ? new Date(news.published_at).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ''}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{news.publisher}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {news.title}
                    </h4>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {news.summary}
                    </p>
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
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">관련 뉴스가 없습니다</h3>
              <p className="text-gray-600">해당 토픽과 관련된 뉴스를 찾을 수 없습니다.</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;