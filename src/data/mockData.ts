import { NewsItem, HotTopic, NewsDelivery, KakaoMessage } from '../types';

export const mockNews: NewsItem[] = [
  // 삼성전자 관련 뉴스
  {
    id: '1',
    title: '삼성전자, AI 반도체 5조원 대규모 투자 발표',
    description: '삼성전자가 차세대 인공지능 반도체 개발을 위해 5조원 규모의 대규모 투자를 발표했습니다.',
    originallink: 'https://www.samsung.com/news/ai-invest',
    link: 'https://n.news.naver.com/mnews/article/001/0012345678',
    pubDate: 'Tue, 01 Jul 2025 09:00:00 +0900',
    category: '경제',
    imageUrl: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: '삼성전자, 2025년까지 1만 명 채용 계획 발표',
    description: '삼성전자가 미래 기술 인재 확보를 위한 대규모 채용 계획을 공개했습니다.',
    originallink: 'https://www.samsung.com/news/hiring',
    link: 'https://n.news.naver.com/mnews/article/001/0012345679',
    pubDate: 'Tue, 01 Jul 2025 08:30:00 +0900',
    category: '경제',
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: '삼성전자 주가 상승, AI 호재로 3% 급등',
    description: 'AI 시장 호황에 따라 삼성전자 주가가 장중 3% 상승하며 강세를 보이고 있습니다.',
    originallink: 'https://finance.samsung.com/stock-rise',
    link: 'https://n.news.naver.com/mnews/article/001/0012345680',
    pubDate: 'Tue, 01 Jul 2025 07:45:00 +0900',
    category: '경제',
    imageUrl: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: '삼성전자, 갤럭시 S26 AI 기능 대폭 강화',
    description: '삼성전자가 차세대 갤럭시 S26에 혁신적인 AI 기능을 탑재한다고 발표했습니다.',
    originallink: 'https://www.samsung.com/galaxy-s26-ai',
    link: 'https://n.news.naver.com/mnews/article/001/0012345681',
    pubDate: 'Mon, 30 Jun 2025 18:30:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: '삼성전자, 글로벌 메모리 반도체 시장 점유율 1위 유지',
    description: '삼성전자가 2025년 상반기 글로벌 메모리 반도체 시장에서 1위 자리를 굳건히 지켰습니다.',
    originallink: 'https://www.samsung.com/memory-market-leader',
    link: 'https://n.news.naver.com/mnews/article/001/0012345682',
    pubDate: 'Mon, 30 Jun 2025 16:20:00 +0900',
    category: '경제',
    imageUrl: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // AI 반도체 관련 뉴스
  {
    id: '6',
    title: 'SK하이닉스, AI 반도체 HBM4 개발 성공',
    description: 'SK하이닉스가 차세대 AI 반도체용 고대역폭 메모리 HBM4 개발에 성공했다고 발표했습니다.',
    originallink: 'https://www.skhynix.com/hbm4-success',
    link: 'https://n.news.naver.com/mnews/article/002/0012345683',
    pubDate: 'Tue, 01 Jul 2025 10:15:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    title: '엔비디아, 한국 AI 반도체 기업과 협력 확대',
    description: '엔비디아가 한국의 AI 반도체 기업들과의 협력을 대폭 확대한다고 발표했습니다.',
    originallink: 'https://www.nvidia.com/korea-partnership',
    link: 'https://n.news.naver.com/mnews/article/002/0012345684',
    pubDate: 'Tue, 01 Jul 2025 09:45:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    title: 'AI 반도체 시장, 2025년 1000억 달러 돌파 전망',
    description: '글로벌 AI 반도체 시장이 2025년 1000억 달러를 돌파할 것으로 전망된다고 발표했습니다.',
    originallink: 'https://www.techmarket.com/ai-chip-1000b',
    link: 'https://n.news.naver.com/mnews/article/002/0012345685',
    pubDate: 'Mon, 30 Jun 2025 20:30:00 +0900',
    category: '경제',
    imageUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // OpenAI 관련 뉴스
  {
    id: '9',
    title: 'OpenAI, 새로운 GPT-5 모델 공개... 한국어 성능 대폭 개선',
    description: 'OpenAI가 최신 GPT-5 모델을 공개하며 한국어 처리 성능이 크게 향상되었다고 발표했습니다.',
    originallink: 'https://openai.com/gpt5-korean',
    link: 'https://n.news.naver.com/mnews/article/003/0012345686',
    pubDate: 'Tue, 01 Jul 2025 11:00:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '10',
    title: 'OpenAI CEO, 한국 방문해 AI 협력 방안 논의',
    description: 'OpenAI CEO가 한국을 방문해 정부 및 기업과 AI 기술 협력 방안을 논의했습니다.',
    originallink: 'https://openai.com/korea-visit',
    link: 'https://n.news.naver.com/mnews/article/003/0012345687',
    pubDate: 'Mon, 30 Jun 2025 19:15:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // 전기차 관련 뉴스
  {
    id: '11',
    title: '현대차, 전기차 배터리 신기술 개발로 주가 급등',
    description: '현대자동차가 혁신적인 전기차 배터리 기술을 개발했다고 발표하며 주가가 5% 상승했습니다.',
    originallink: 'https://www.hyundai.com/battery-tech',
    link: 'https://n.news.naver.com/mnews/article/004/0012345688',
    pubDate: 'Tue, 01 Jul 2025 12:30:00 +0900',
    category: '자동차',
    imageUrl: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '12',
    title: '기아, 전기차 EV9 유럽 시장 진출 성공',
    description: '기아자동차의 전기차 EV9이 유럽 시장에서 큰 성공을 거두며 판매량이 급증하고 있습니다.',
    originallink: 'https://www.kia.com/ev9-europe-success',
    link: 'https://n.news.naver.com/mnews/article/004/0012345689',
    pubDate: 'Mon, 30 Jun 2025 17:45:00 +0900',
    category: '자동차',
    imageUrl: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // K-팝 관련 뉴스
  {
    id: '13',
    title: 'K-팝 아이돌 그룹, 빌보드 차트 1위 달성',
    description: '한국의 신인 아이돌 그룹이 빌보드 핫 100 차트에서 1위를 차지하며 K-팝 역사를 새로 썼습니다.',
    originallink: 'https://www.billboard.com/kpop-number-one',
    link: 'https://n.news.naver.com/mnews/article/005/0012345690',
    pubDate: 'Tue, 01 Jul 2025 13:20:00 +0900',
    category: '연예',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '14',
    title: 'BTS, 새 앨범 발매 예고로 전 세계 팬들 열광',
    description: 'BTS가 새 앨범 발매를 예고하며 전 세계 팬들이 뜨거운 반응을 보이고 있습니다.',
    originallink: 'https://www.bts-official.com/new-album',
    link: 'https://n.news.naver.com/mnews/article/005/0012345691',
    pubDate: 'Mon, 30 Jun 2025 21:00:00 +0900',
    category: '연예',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // 현대차 관련 뉴스
  {
    id: '15',
    title: '현대차그룹, 수소차 기술 글로벌 1위 달성',
    description: '현대차그룹이 수소차 기술 분야에서 글로벌 1위를 달성했다고 발표했습니다.',
    originallink: 'https://www.hyundai.com/hydrogen-leader',
    link: 'https://n.news.naver.com/mnews/article/006/0012345692',
    pubDate: 'Tue, 01 Jul 2025 14:15:00 +0900',
    category: '자동차',
    imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // 스타트업 관련 뉴스
  {
    id: '16',
    title: '한국 스타트업, 글로벌 AI 경진대회 우승',
    description: '한국의 스타트업이 세계 최대 AI 경진대회에서 우승하며 글로벌 기술력을 인정받았습니다.',
    originallink: 'https://www.ai-competition.com/korean-winner',
    link: 'https://n.news.naver.com/mnews/article/007/0012345693',
    pubDate: 'Mon, 30 Jun 2025 22:30:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // 빌보드 관련 뉴스
  {
    id: '17',
    title: '한국 음악, 빌보드 차트 점령... K-팝 전성시대',
    description: '한국 음악이 빌보드 차트를 점령하며 K-팝의 전성시대를 열고 있습니다.',
    originallink: 'https://www.billboard.com/kpop-domination',
    link: 'https://n.news.naver.com/mnews/article/008/0012345694',
    pubDate: 'Tue, 01 Jul 2025 15:45:00 +0900',
    category: '연예',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // 배터리 관련 뉴스
  {
    id: '18',
    title: 'LG에너지솔루션, 차세대 배터리 기술 공개',
    description: 'LG에너지솔루션이 혁신적인 차세대 배터리 기술을 공개하며 업계의 주목을 받고 있습니다.',
    originallink: 'https://www.lgensol.com/next-gen-battery',
    link: 'https://n.news.naver.com/mnews/article/009/0012345695',
    pubDate: 'Mon, 30 Jun 2025 23:15:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // GPT-5 관련 뉴스
  {
    id: '19',
    title: 'GPT-5, 한국 기업들과 협력 확대... 맞춤형 AI 서비스 제공',
    description: 'GPT-5가 한국 기업들과의 협력을 확대하며 맞춤형 AI 서비스를 제공한다고 발표했습니다.',
    originallink: 'https://openai.com/gpt5-korea-business',
    link: 'https://n.news.naver.com/mnews/article/010/0012345696',
    pubDate: 'Tue, 01 Jul 2025 16:30:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400'
  },

  // 추가 뉴스 (더보기용)
  {
    id: '20',
    title: '네이버, AI 검색 엔진 대폭 업그레이드',
    description: '네이버가 AI 기반 검색 엔진을 대폭 업그레이드하여 사용자 경험을 개선했습니다.',
    originallink: 'https://www.naver.com/ai-search-upgrade',
    link: 'https://n.news.naver.com/mnews/article/011/0012345697',
    pubDate: 'Wed, 02 Jul 2025 10:00:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '21',
    title: '카카오, 새로운 AI 챗봇 서비스 출시',
    description: '카카오가 혁신적인 AI 챗봇 서비스를 출시하며 메신저 시장에 새로운 변화를 가져왔습니다.',
    originallink: 'https://www.kakao.com/ai-chatbot-launch',
    link: 'https://n.news.naver.com/mnews/article/012/0012345698',
    pubDate: 'Wed, 02 Jul 2025 11:30:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '22',
    title: 'LG전자, 스마트홈 AI 플랫폼 글로벌 확산',
    description: 'LG전자의 스마트홈 AI 플랫폼이 전 세계적으로 확산되며 IoT 시장을 선도하고 있습니다.',
    originallink: 'https://www.lg.com/smarthome-ai-global',
    link: 'https://n.news.naver.com/mnews/article/013/0012345699',
    pubDate: 'Wed, 02 Jul 2025 14:20:00 +0900',
    category: '기술',
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockHotTopics: HotTopic[] = [
  { id: '1', keyword: '삼성전자', count: 1247, rank: 1 },
  { id: '2', keyword: 'AI 반도체', count: 892, rank: 2 },
  { id: '3', keyword: 'OpenAI', count: 756, rank: 3 },
  { id: '4', keyword: '전기차', count: 643, rank: 4 },
  { id: '5', keyword: 'K-팝', count: 587, rank: 5 },
  { id: '6', keyword: '스타트업', count: 1247, rank: 6 },
  { id: '7', keyword: '백엔드 개발', count: 892, rank: 7 },
  { id: '8', keyword: 'Chat GPT', count: 756, rank: 8 },
  { id: '9', keyword: '테토남', count: 643, rank: 9 },
  { id: '10', keyword: 'OpenSearch API', count: 587, rank: 10 }
];

// Mock news deliveries for calendar with more dates
export const mockNewsDeliveries: NewsDelivery[] = [
  {
    date: '2025-01-15',
    news: [mockNews[0], mockNews[8], mockNews[10], mockNews[12], mockNews[15]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-14',
    news: [mockNews[1], mockNews[6], mockNews[11], mockNews[13], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-13',
    news: [mockNews[2], mockNews[7], mockNews[9], mockNews[14], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-10',
    news: [mockNews[3], mockNews[5], mockNews[8], mockNews[12], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-09',
    news: [mockNews[4], mockNews[6], mockNews[10], mockNews[13], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-08',
    news: [mockNews[0], mockNews[7], mockNews[11], mockNews[14], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-07',
    news: [mockNews[1], mockNews[5], mockNews[9], mockNews[15], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-06',
    news: [mockNews[2], mockNews[6], mockNews[8], mockNews[12], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-03',
    news: [mockNews[3], mockNews[7], mockNews[10], mockNews[13], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2025-01-02',
    news: [mockNews[4], mockNews[5], mockNews[11], mockNews[14], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2024-12-31',
    news: [mockNews[0], mockNews[6], mockNews[9], mockNews[15], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차']
  },
  {
    date: '2024-12-30',
    news: [mockNews[1], mockNews[7], mockNews[8], mockNews[12], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차']
  }
];

// Mock Kakao Messages (24개)
export const mockKakaoMessages: KakaoMessage[] = [
  {
    id: 'msg_24',
    date: '2025-01-15',
    news: [mockNews[0], mockNews[8], mockNews[10], mockNews[12], mockNews[15]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_23',
    date: '2025-01-14',
    news: [mockNews[1], mockNews[6], mockNews[11], mockNews[13], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_22',
    date: '2025-01-13',
    news: [mockNews[2], mockNews[7], mockNews[9], mockNews[14], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_21',
    date: '2025-01-10',
    news: [mockNews[3], mockNews[5], mockNews[8], mockNews[12], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_20',
    date: '2025-01-09',
    news: [mockNews[4], mockNews[6], mockNews[10], mockNews[13], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_19',
    date: '2025-01-08',
    news: [mockNews[0], mockNews[7], mockNews[11], mockNews[14], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_18',
    date: '2025-01-07',
    news: [mockNews[1], mockNews[5], mockNews[9], mockNews[15], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_17',
    date: '2025-01-06',
    news: [mockNews[2], mockNews[6], mockNews[8], mockNews[12], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_16',
    date: '2025-01-03',
    news: [mockNews[3], mockNews[7], mockNews[10], mockNews[13], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_15',
    date: '2025-01-02',
    news: [mockNews[4], mockNews[5], mockNews[11], mockNews[14], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_14',
    date: '2024-12-31',
    news: [mockNews[0], mockNews[6], mockNews[9], mockNews[15], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_13',
    date: '2024-12-30',
    news: [mockNews[1], mockNews[7], mockNews[8], mockNews[12], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_12',
    date: '2024-12-27',
    news: [mockNews[2], mockNews[5], mockNews[10], mockNews[14], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_11',
    date: '2024-12-26',
    news: [mockNews[3], mockNews[6], mockNews[11], mockNews[13], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_10',
    date: '2024-12-25',
    news: [mockNews[4], mockNews[7], mockNews[9], mockNews[15], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_9',
    date: '2024-12-24',
    news: [mockNews[0], mockNews[8], mockNews[12], mockNews[14], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_8',
    date: '2024-12-23',
    news: [mockNews[1], mockNews[5], mockNews[10], mockNews[13], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_7',
    date: '2024-12-20',
    news: [mockNews[2], mockNews[6], mockNews[11], mockNews[15], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_6',
    date: '2024-12-19',
    news: [mockNews[3], mockNews[7], mockNews[9], mockNews[12], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_5',
    date: '2024-12-18',
    news: [mockNews[4], mockNews[8], mockNews[10], mockNews[14], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_4',
    date: '2024-12-17',
    news: [mockNews[0], mockNews[5], mockNews[11], mockNews[13], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_3',
    date: '2024-12-16',
    news: [mockNews[1], mockNews[6], mockNews[9], mockNews[15], mockNews[18]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_2',
    date: '2024-12-13',
    news: [mockNews[2], mockNews[7], mockNews[10], mockNews[12], mockNews[16]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  },
  {
    id: 'msg_1',
    date: '2024-12-12',
    news: [mockNews[3], mockNews[8], mockNews[11], mockNews[14], mockNews[17]],
    keywords: ['삼성전자', 'AI', '현대차'],
    sentTime: '08:00'
  }
];

// Generate news for specific topics (mock Elasticsearch functionality)
export const getNewsByTopic = (keyword: string): NewsItem[] => {
  const keywordMap: { [key: string]: number[] } = {
    '삼성전자': [0, 1, 2, 3, 4],
    'AI 반도체': [5, 6, 7],
    'OpenAI': [8, 9, 18],
    '전기차': [10, 11],
    'K-팝': [12, 13, 16],
    '현대차': [10, 14],
    '스타트업': [15],
    '빌보드': [12, 16],
    '배터리': [10, 17],
    'GPT-5': [8, 18]
  };

  const indices = keywordMap[keyword] || [];
  return indices.map(index => mockNews[index]).filter(Boolean);
};

// 더보기 뉴스 생성 (날짜별 10개 추가 뉴스)
export const getMoreNewsByDate = (date: string): NewsItem[] => {
  // 실제로는 해당 날짜의 키워드를 기반으로 추가 뉴스를 검색
  // 여기서는 mock 데이터로 10개 반환
  const additionalNews = [
    mockNews[19], mockNews[20], mockNews[21], mockNews[0], mockNews[1],
    mockNews[2], mockNews[3], mockNews[4], mockNews[5], mockNews[6]
  ];
  
  return additionalNews.slice(0, 10);
};

// AI 요약 생성
export const getAISummaryByDate = (date: string): string => {
  const summaries = [
    `📊 **${new Date(date).toLocaleDateString('ko-KR')} 뉴스 요약**

**주요 키워드**: 삼성전자, AI 기술, 현대차

**핵심 내용**:
• **삼성전자**: AI 반도체 분야에 5조원 대규모 투자를 발표하며, 차세대 인공지능 기술 개발에 박차를 가하고 있습니다. 갤럭시 S26에도 혁신적인 AI 기능이 탑재될 예정입니다.

• **AI 기술 동향**: OpenAI의 GPT-5 모델이 한국어 성능을 대폭 개선하여 공개되었으며, 한국 기업들과의 협력도 확대되고 있습니다.

• **자동차 산업**: 현대차가 전기차 배터리 신기술을 개발하여 주가가 급등했으며, 수소차 기술 분야에서도 글로벌 1위를 달성했습니다.

**시장 전망**: 
AI 반도체 시장이 급성장하고 있으며, 한국 기업들의 기술 경쟁력이 크게 향상되고 있는 상황입니다. 특히 삼성전자와 현대차의 혁신적인 기술 개발이 주목받고 있습니다.`,

    `📈 **${new Date(date).toLocaleDateString('ko-KR')} 주요 뉴스 분석**

**트렌드 분석**: 
오늘의 뉴스는 주로 기술 혁신과 글로벌 경쟁력 강화에 초점이 맞춰져 있습니다.

**섹터별 요약**:

🔹 **반도체**: SK하이닉스의 HBM4 개발 성공과 엔비디아의 한국 기업 협력 확대가 주요 이슈입니다.

🔹 **엔터테인먼트**: K-팝이 빌보드 차트를 석권하며 한류의 글로벌 영향력이 더욱 확대되고 있습니다.

🔹 **스타트업**: 한국 스타트업이 글로벌 AI 경진대회에서 우승하며 기술력을 인정받았습니다.

**투자 포인트**:
AI, 반도체, 전기차 관련 기업들의 주가 상승이 예상되며, 특히 기술 혁신을 주도하는 기업들에 대한 관심이 높아지고 있습니다.`,

    `🌟 **${new Date(date).toLocaleDateString('ko-KR')} 종합 뉴스 브리핑**

**오늘의 하이라이트**:

1. **기술 혁신**: 
   - LG에너지솔루션의 차세대 배터리 기술 공개
   - 네이버 AI 검색 엔진 대폭 업그레이드
   - 카카오 AI 챗봇 서비스 출시

2. **글로벌 성과**:
   - 한국 음악의 빌보드 차트 점령
   - K-팝 아이돌 그룹의 연이은 성공
   - 한국 기업들의 해외 시장 진출 확대

3. **산업 동향**:
   - AI 반도체 시장 1000억 달러 돌파 전망
   - 전기차 시장의 급속한 성장
   - 스마트홈 AI 플랫폼의 글로벌 확산

**결론**: 
한국 기업들이 AI, 반도체, 엔터테인먼트 등 다양한 분야에서 글로벌 리더십을 발휘하고 있으며, 지속적인 기술 혁신을 통해 경쟁력을 강화하고 있습니다.`
  ];

  // 날짜에 따라 다른 요약 반환 (실제로는 AI API 호출)
  const index = new Date(date).getDate() % summaries.length;
  return summaries[index];
};