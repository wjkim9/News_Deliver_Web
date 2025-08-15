# 🦁 LionNewsDeliver-Web

국내 주요 뉴스를 수집·분석하여 핫토픽, 맞춤형 뉴스, 피드백 기능을 제공하는 웹 프론트엔드 프로젝트입니다.

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-org/LionNewsDeliver-Web.git
cd LionNewsDeliver-Web
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

- 별도의 `.env` 파일이 필요하다면 예시를 참고해 생성하세요.
- 기본적으로 Vite 프록시가 `/api`, `/sub` 경로를 `http://localhost:8080`(백엔드)으로 연결합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

- 브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

### 5. 빌드

```bash
npm run build
```

- `dist/` 폴더에 정적 파일이 생성됩니다.

---

## ⚙️ 주요 기술 스택

- React (TypeScript)
- Tailwind CSS
- Vite
- 기타: lucide-react, etc.

---

## 📝 주요 기능

- **로그인/로그아웃**: 카카오톡 기반 인증(토큰 기반)
- **설정 페이지**: 뉴스 키워드, 차단 키워드 등 설정 및 저장/수정/삭제
- **핫토픽**: 어제의 인기 키워드 TOP 10 및 관련 뉴스 모달
- **마이페이지**: 내 뉴스 히스토리, 피드백(좋아요/싫어요) 기능
- **API 연동**: 모든 요청에 accessToken(로컬스토리지) 포함

---

## 🛠️ 개발 참고

- **백엔드 서버**가 반드시 `http://localhost:8080`에서 실행 중이어야 합니다.
- Vite 프록시 설정(`vite.config.ts`)이 `/api`, `/sub` 경로를 백엔드로 연결합니다.
- API 명세 및 응답 구조는 실제 백엔드와 맞춰져 있습니다.

---

## 💡 Trouble Shooting

- **API 401/403 에러**: accessToken이 없거나 만료된 경우, 재로그인 필요
- **CORS 에러**: 백엔드 서버가 실행 중인지, 프록시 설정이 올바른지 확인
- **환경 변수**: 필요시 `.env` 파일을 추가로 설정

---

## 👨‍💻 기여 방법

1. 이슈 등록 또는 포크 후 PR 생성
2. 커밋 메시지는 명확하게 작성
3. 코드 스타일은 기존 컨벤션을 따름

---

## 📂 폴더 구조

```
src/
  components/   # 주요 페이지 및 UI 컴포넌트
  data/         # 목업 데이터
  types/        # 타입 정의
  assets/       # 이미지 등 정적 파일
  index.css     # 글로벌 스타일
  main.tsx      # 엔트리포인트
```

---

**즐거운 개발 되세요! 🦁** 
