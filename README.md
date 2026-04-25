# Next.js Starter Kit

Next.js 16 + TypeScript + Tailwind v4 기반의 재사용 가능한 스타터 킷.

## 포함된 항목

- **Next.js 16** (App Router, Turbopack)
- **TypeScript 5** (strict)
- **Tailwind CSS v4** (CSS-first 방식)
- **shadcn/ui** (Button, Input 샘플)
- **next-themes** (라이트/다크/시스템 모드 토글)
- **Prettier 3** + `prettier-plugin-tailwindcss` (클래스 자동 정렬)
- **ESLint** flat config (Next.js 16 기본)

## 시작하기

```bash
npm install
npm run dev
```

http://localhost:3000 접속.

## 사용 가능한 스크립트

| 명령                   | 설명                       |
| ---------------------- | -------------------------- |
| `npm run dev`          | 개발 서버 실행 (Turbopack) |
| `npm run build`        | 프로덕션 빌드              |
| `npm run start`        | 빌드 결과 실행             |
| `npm run lint`         | ESLint 검사                |
| `npm run format`       | Prettier 자동 정렬         |
| `npm run format:check` | Prettier 검사만 (수정 X)   |

## 폴더 구조

```
src/
├── app/                 # Next.js 페이지 / 레이아웃
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트
│   ├── layout/          # Header, Footer 등 공통 레이아웃
│   ├── theme-provider.tsx
│   └── mode-toggle.tsx
├── hooks/               # 커스텀 훅
├── lib/                 # 유틸 함수 (cn 등)
├── types/               # 전역 타입 (env.d.ts 등)
├── constants/           # 상수
└── stores/              # 전역 상태 (Zustand 등 도입 시)
```

## 환경변수

1. `.env.example`을 복사해 `.env.local` 생성
2. 클라이언트 노출 변수는 `NEXT_PUBLIC_` 접두사 필수
3. 새 변수 추가 시 `src/types/env.d.ts`에 타입 선언

## shadcn 컴포넌트 추가

```bash
npx shadcn@latest add <component-name>
```

예: `npx shadcn@latest add card dialog`

## 추후 도입 권장 (선택)

| 카테고리         | 라이브러리            |
| ---------------- | --------------------- |
| 전역 상태        | Zustand               |
| 서버 상태 / 캐싱 | TanStack Query        |
| 폼               | react-hook-form + Zod |
| 인증             | Auth.js, Clerk        |
| 테스트           | Vitest, Playwright    |
