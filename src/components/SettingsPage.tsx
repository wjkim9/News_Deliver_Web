import React, { useState, useEffect } from 'react';
import { Clock, Plus, X, Save, Calendar, Hash, Settings } from 'lucide-react';

type KeywordType = 'include' | 'exclude';

type KeywordEntry = {
  type: KeywordType;
  value: string;
};

// SettingData 타입 정의
interface SettingData {
  id?: number;
  deliveryTime: string;
  deliveryStartDate: string;
  deliveryEndDate: string;
  selectedDays: string[];
  keywords: KeywordEntry[];
}

type DeliveryBoxProps = {
  index: number;
  onRemove: () => void;
  initialSetting?: Partial<SettingData>;
};

// ISO 8601 → 'HH:mm' 변환 함수
function isoToTime(isoString: string | undefined) {
  if (!isoString) return '08:00';
  const date = new Date(isoString);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

// 숫자 요일 → 한글 매핑
const numberToDay: { [key: number]: string } = { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토', 7: '일' };

// ISO 8601 → 'YYYY-MM-DD' 변환
function isoToDate(isoString: string | undefined) {
  if (!isoString) return '';
  return isoString.slice(0, 10);
}

// 서버 응답을 DeliveryBox의 initialSetting으로 변환
function convertSettingFromServer(setting: any): Partial<SettingData> {
  return {
    id: setting.id,
    deliveryTime: setting.deliveryTime, // 이미 isoToTime에서 처리
    deliveryStartDate: isoToDate(setting.startDate),
    deliveryEndDate: isoToDate(setting.endDate),
    selectedDays: Array.isArray(setting.days) ? setting.days.map((n: number) => numberToDay[n]) : [],
    keywords: [
      ...(setting.settingKeywords || []).map((v: string) => ({ type: 'include', value: v })),
      ...(setting.blockKeywords || []).map((v: string) => ({ type: 'exclude', value: v })),
    ],
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.likelionnews.click';
const DeliveryBox: React.FC<DeliveryBoxProps> = ({ index, onRemove, initialSetting }) => {
  // id 상태 추가
  const [id, setId] = useState<number | undefined>(initialSetting?.id);
  const [keywords, setKeywords] = useState<KeywordEntry[]>(initialSetting?.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');
  const [newKeywordType, setNewKeywordType] = useState<KeywordType>('include');
  const [deliveryTime, setDeliveryTime] = useState(
    initialSetting?.deliveryTime ? isoToTime(initialSetting.deliveryTime as string) : '08:00'
  );
  const [deliveryStartDate, setDeliveryStartDate] = useState(initialSetting?.deliveryStartDate || '');
  const [deliveryEndDate, setDeliveryEndDate] = useState(initialSetting?.deliveryEndDate || '');
  const [selectedDays, setSelectedDays] = useState<string[]>(initialSetting?.selectedDays || ['월', '화', '수', '목', '금']);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

  const addKeyword = () => {
    const trimmed = newKeyword.trim();
    if (!trimmed || keywords.length >= 5) return;
    if (keywords.some(k => k.value === trimmed && k.type === newKeywordType)) return;

    setKeywords([...keywords, { type: newKeywordType, value: trimmed }]);
    setNewKeyword('');
  };

  const removeKeyword = (target: KeywordEntry) => {
    setKeywords(keywords.filter(k => !(k.type === target.type && k.value === target.value)));
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // 한글 요일 → 숫자 매핑
  const dayToNumber: { [key: string]: number } = { '월': 1, '화': 2, '수': 3, '목': 4, '금': 5, '토': 6, '일': 7 };

  // 날짜+시간을 ISO 8601로 변환 (예: 2024-06-01 + 08:00 → 2024-06-01T08:00:00.000Z)
  function toISODateTime(date: string, time: string) {
    if (!date || !time) return '';
    // 브라우저 환경에서 시간대 문제를 피하려면 local time으로 조합 후 toISOString
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);
    const d = new Date(year, month - 1, day, hour, minute);
    return d.toISOString();
  }

  // 저장 함수 수정: id 유무에 따라 POST/PUT
  const handleSave = async () => {
    if (!deliveryStartDate || !deliveryEndDate || selectedDays.length === 0) {
      alert('배송 시작일, 종료일, 요일을 모두 설정해주세요.');
      return;
    }
    if (new Date(deliveryStartDate) >= new Date(deliveryEndDate)) {
      alert('배송 종료일은 시작일보다 늦어야 합니다.');
      return;
    }
    setIsSaving(true);
    // SettingDTO에 맞게 데이터 변환
    const settingData = {
      id,
      deliveryTime: toISODateTime(deliveryStartDate, deliveryTime), // deliveryTime도 ISO 8601로 보냄
      startDate: toISODateTime(deliveryStartDate, deliveryTime),
      endDate: toISODateTime(deliveryEndDate, deliveryTime),
      settingKeywords: keywords.filter(k => k.type === 'include').map(k => k.value),
      blockKeywords: keywords.filter(k => k.type === 'exclude').map(k => k.value),
      days: selectedDays.map(day => dayToNumber[day]),
      // userId는 백엔드에서 JWT로 추출
    };
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API_BASE_URL}/api/setting`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(settingData),
      });
      if (res.ok) {
        if (!id) {
          const newId = await res.json();
          setId(newId);
        }
        alert('설정이 성공적으로 저장되었습니다!');
      } else {
        alert('설정 저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('설정 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 삭제 함수
  const handleDelete = async () => {
    if (!id) {
      // 아직 저장 전인 박스는 그냥 프론트에서만 삭제
      onRemove();
      return;
    }
    if (!window.confirm('정말로 이 설정을 삭제하시겠습니까?')) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${API_BASE_URL}/api/setting/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      if (res.status === 204) {
        onRemove();
      } else {
        alert('설정 삭제 중 오류가 발생했습니다.');
      }
    } catch (e) {
      alert('설정 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 space-y-8 relative hover:shadow-lg transition-all duration-300">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-6 right-6 text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 z-10 disabled:opacity-60"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <X className="w-5 h-5" />
        )}
      </button>

      {/* 배송 설정 */}
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">배송 설정 #{index + 1}</h2>
            <p className="text-gray-600">뉴스를 받을 시간과 요일, 기간을 설정하세요</p>
          </div>
        </div>

        {/* 배송 기간 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              배송 시작일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={deliveryStartDate}
              onChange={(e) => setDeliveryStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              배송 종료일 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={deliveryEndDate}
              onChange={(e) => setDeliveryEndDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              required
            />
          </div>
        </div>

        {/* 배송 시간 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              배송 시간
            </label>
            <input
              type="time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
        </div>

        {/* 요일 */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            요일 설정 <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {weekDays.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedDays.includes(day)
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3 font-medium">
            선택된 요일: {selectedDays.length > 0 ? selectedDays.join(', ') : '없음'}
          </p>
          {selectedDays.length === 0 && (
            <p className="text-sm text-red-600 mt-2 font-medium">최소 하나의 요일을 선택해주세요.</p>
          )}
        </div>
      </div>

      {/* 관심 키워드 */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Hash className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">관심 키워드</h2>
            <p className="text-sm text-gray-600">최대 5개까지 추가할 수 있습니다 (포함/제외 합산)</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex space-x-3 mb-4">
          <select
            value={newKeywordType}
            onChange={(e) => setNewKeywordType(e.target.value as KeywordType)}
            className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          >
            <option value="include">포함</option>
            <option value="exclude">제외</option>
          </select>
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
            placeholder="새 키워드 입력"
            disabled={keywords.length >= 5}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50 hover:bg-white transition-all duration-200"
          />
          <button
            type="button"
            onClick={addKeyword}
            disabled={keywords.length >= 5 || !newKeyword.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden space-y-3 mb-4">
          <div className="flex space-x-3">
            <select
              value={newKeywordType}
              onChange={(e) => setNewKeywordType(e.target.value as KeywordType)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
            >
              <option value="include">포함</option>
              <option value="exclude">제외</option>
            </select>
            <button
              type="button"
              onClick={addKeyword}
              disabled={keywords.length >= 5 || !newKeyword.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
            placeholder="새 키워드 입력"
            disabled={keywords.length >= 5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50 hover:bg-white transition-all duration-200"
          />
        </div>

        <div className="text-sm text-gray-600 font-medium mb-3">{keywords.length}/5 키워드 사용 중</div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {keywords.map((keyword, i) => (
              <span
                key={`${keyword.type}-${keyword.value}-${i}`}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                  keyword.type === 'include'
                    ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
                }`}
              >
                [{keyword.type === 'include' ? '포함' : '제외'}] {keyword.value}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 hover:opacity-70 p-1 rounded-full hover:bg-white/50 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 저장 버튼 - 각 박스별로만 표시 */}
      <div className="pt-8 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold text-lg shadow-lg hover:shadow-xl"
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>저장 중...</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>설정 저장</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  // boxes: SettingData[] 배열로 변경
  const [boxes, setBoxes] = useState<Partial<SettingData>[]>([]);
  const [loading, setLoading] = useState(true);

  // 설정 목록 조회 API 호출
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await fetch(`${API_BASE_URL}/api/setting`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });
        if (res.ok) {
          const data = await res.json();
          // data가 배열이 아니면 빈 배열로 처리, 변환 함수 적용
          setBoxes(Array.isArray(data) ? data.map(convertSettingFromServer) : []);
        } else {
          setBoxes([]);
        }
      } catch (e) {
        setBoxes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 새 박스 추가 (빈 설정)
  const addBox = () => {
    if (boxes.length < 3) {
      setBoxes([...boxes, {}]);
    }
  };

  // 박스 삭제 (index 기준)
  const removeBox = (idx: number) => {
    if (boxes.length > 1) {
      setBoxes(boxes.filter((_, i) => i !== idx));
    } else {
      setBoxes([]);
      setTimeout(() => {
        setBoxes([{}]);
      }, 100);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">설정</h1>
        <p className="text-gray-600 text-lg">뉴스 수신 설정을 관리하세요</p>
      </div>
      {/* 안내 메시지 */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-md">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <div className="text-blue-800">
            <p className="font-bold text-lg mb-2">설정 안내</p>
            <ul className="space-y-2 text-blue-700 font-medium">
              <li>• 각 배송 설정을 완료한 후 반드시 "설정 저장" 버튼을 눌러주세요.</li>
              <li>• 최대 3개의 배송 설정을 만들 수 있습니다.</li>
              <li>• 배송 시작일, 종료일, 요일은 필수 입력 항목입니다.</li>
            </ul>
          </div>
        </div>
      </div>
      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-8 text-lg text-gray-500">설정 정보를 불러오는 중...</div>
      )}
      {/* 배송 박스 리스트 */}
      {!loading && boxes.map((setting, index) => (
        <DeliveryBox
          key={setting.id ? String(setting.id) : `new-${index}`}
          index={index}
          onRemove={() => removeBox(index)}
          initialSetting={setting}
        />
      ))}
      {/* 추가 버튼 */}
      {boxes.length < 3 && (
        <div className="text-center bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <button
            onClick={addBox}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-3 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>배송 설정 추가하기</span>
          </button>
          <p className="text-gray-600 mt-4 font-medium">
            {boxes.length}/3개 배송 설정 사용 중
          </p>
        </div>
      )}
      {/* 전체 설정이 없을 때 메시지 */}
      {boxes.length === 0 && !loading && (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Clock className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">배송 설정이 없습니다</h3>
          <p className="text-gray-600 mb-8 text-lg">새로운 배송 설정을 추가해보세요.</p>
          <button
            onClick={addBox}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-3 mx-auto font-bold text-lg shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>첫 번째 배송 설정 만들기</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;