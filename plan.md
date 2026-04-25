# Next.js Starter Kit 개발 계획

> 작성일: 2026-04-25
> 목표: Next.js + TypeScript + Tailwind 기반의 재사용 가능한 스타터 킷 구축

---

## 기술 스택 (확정)

| 카테고리      | 선택         | 버전           | 비고                              |
| ------------- | ------------ | -------------- | --------------------------------- |
| 프레임워크    | Next.js      | 16.2.4+        | App Router, Turbopack             |
| 언어          | TypeScript   | 5.1+           | strict 모드 활성화                |
| 스타일        | Tailwind CSS | v4.2+          | CSS-first 방식                    |
| UI 컴포넌트   | shadcn/ui    | latest         | 헤드리스, 코드 직접 복사          |
| 다크모드      | next-themes  | latest         | 시스템/라이트/다크                |
| 포맷터        | Prettier     | v3+            | + prettier-plugin-tailwindcss     |
| 린터          | ESLint       | (Next.js 기본) | flat config (`eslint.config.mjs`) |
| 패키지 매니저 | npm          | -              | CLAUDE.md 컨벤션                  |

---

## 공식 문서 가이드 준수 확인

### 1. Next.js 공식 설치 가이드 ([nextjs.org/docs](https://nextjs.org/docs/app/getting-started/installation))

- `create-next-app@latest`는 다음을 **기본 포함**:
  - ✅ TypeScript
  - ✅ ESLint
  - ✅ Tailwind CSS (v4)
  - ✅ App Router
  - ✅ Turbopack (default bundler)
  - ✅ Import alias `@/*`
  - ✅ AGENTS.md / CLAUDE.md (코딩 에이전트 가이드)
- Node.js **20.9 이상** 필요
- `src/` 디렉토리는 옵션이지만 본 프로젝트 컨벤션상 **사용** (`--src-dir` 플래그)

### 2. Tailwind CSS v4 공식 가이드 ([tailwindcss.com](https://tailwindcss.com/docs/installation/framework-guides/nextjs))

- v4는 **CSS-first** 접근:
  - `@import "tailwindcss";` 한 줄로 끝 (구버전 3개 directive 방식 X)
  - `tailwind.config.ts` 파일 **더 이상 필수 아님**
  - 커스터마이징은 CSS의 `@theme {}` 블록 사용
- `create-next-app`이 이미 v4를 자동 설치/설정해주므로 **별도 설치 단계 불필요**

### 3. shadcn/ui 공식 가이드 ([ui.shadcn.com](https://ui.shadcn.com/docs/installation/next))

- 명령어: `npx shadcn@latest init` (구버전 `shadcn-ui` 아님)
- 사전조건: App Router + Tailwind + `@/*` alias (모두 충족)
- 컴포넌트 추가: `npx shadcn@latest add <component>`
- 설치 위치: `@/components/ui/<name>`

### 4. next-themes 공식 가이드 ([github.com/pacocoursey/next-themes](https://github.com/pacocoursey/next-themes))

- 설치: `npm install next-themes`
- **필수**: `<html suppressHydrationWarning>` 추가
- ThemeProvider로 `<body>` 내부 감싸기
- 토글 컴포넌트는 `'use client'` + 마운트 체크 (hydration mismatch 방지)

### 5. prettier-plugin-tailwindcss 가이드 ([github.com/tailwindlabs/prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss))

- Prettier **v3+ 필수**
- 설치: `npm install -D prettier prettier-plugin-tailwindcss`
- `.prettierrc`에 `"plugins": ["prettier-plugin-tailwindcss"]` 등록

---

## 단계별 구현 계획 (10단계)

### Phase 1. Next.js 초기화

**목표**: 현재 디렉토리(`claude-nextjs-starterkit/`)에 Next.js 16+ 프로젝트 생성

```bash
npx create-next-app@latest . \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm \
  --turbopack \
  --yes
```

- `.`로 **현재 디렉토리에 직접 설치** (CLAUDE.md 규칙)
- `--src-dir`로 `src/` 폴더 사용 (CLAUDE.md 컨벤션)
- 자동 포함: TypeScript, Tailwind v4, ESLint, App Router, Turbopack, AGENTS.md/CLAUDE.md

### Phase 2. 보일러플레이트 정리

CLAUDE.md 규칙대로:

1. `src/app/page.tsx` → 빈 컴포넌트로 교체
2. `src/app/globals.css` → Tailwind import만 남김 (`@import "tailwindcss";`)
3. `public/` 내 기본 SVG/이미지 전부 삭제
4. `README.md` 내용 초기화

### Phase 3. Layout 메타데이터 + 한국어 설정

`src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js Starter Kit',
  description: '빠른 시작을 위한 Next.js 스타터 킷',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
```

- `lang="ko"` (CLAUDE.md 규칙)
- `suppressHydrationWarning` (next-themes 요구사항)

### Phase 4. 표준 폴더 구조 생성

CLAUDE.md 컨벤션:

```
src/
├── app/                    # 페이지 (이미 존재)
├── components/
│   ├── ui/                 # 순수 UI (shadcn 포함)
│   └── layout/             # Header, Footer 등
├── hooks/
├── lib/
├── types/
├── constants/
└── stores/
```

각 폴더에 `.gitkeep` 추가하여 빈 폴더 추적.

### Phase 5. shadcn/ui 초기화

```bash
npx shadcn@latest init
```

프롬프트 응답:

- Style: **Default**
- Base color: **Neutral** (또는 Slate)
- CSS variables: **Yes**
- Type for components: `@/components`
- Type for utils: `@/lib/utils`

샘플 컴포넌트 추가:

```bash
npx shadcn@latest add button input
```

설치 결과:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/lib/utils.ts` (cn 헬퍼)
- `components.json`

### Phase 6. next-themes 설치 및 다크모드 구성

```bash
npm install next-themes
```

1. `src/components/theme-provider.tsx` 작성 (`'use client'` 컴포넌트)
2. `src/app/layout.tsx`에서 ThemeProvider로 감싸기
3. `src/components/ui/theme-toggle.tsx` 작성 (해/달 아이콘 토글)

### Phase 7. Prettier + Tailwind 정렬 플러그인

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

`.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`:

```
node_modules
.next
out
public
```

`package.json` scripts 추가:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

### Phase 8. 공통 Layout 컴포넌트 (Header / Footer)

- `src/components/layout/Header.tsx`: 로고 placeholder + 네비게이션 + ThemeToggle
- `src/components/layout/Footer.tsx`: 저작권 placeholder
- `src/app/layout.tsx`에서 Header/Footer 배치

접근성 준수 (CLAUDE.md WCAG):

- 시맨틱 태그 (`<header>`, `<footer>`, `<nav>`)
- 키보드 포커스 표시 유지
- 반응형 (`width < 1200px`에서 모바일 레이아웃)

### Phase 9. 환경변수 타입 + .env.example

`src/types/env.d.ts`:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL?: string
  }
}
```

`.env.example`:

```
# 클라이언트 노출 변수는 NEXT_PUBLIC_ 접두사
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.gitignore` 검증: `.env.local`, `.env*.local` 포함 여부 확인 (Next.js 기본값에 포함되어 있음).

### Phase 10. README + 동작 확인

`README.md` 작성:

- 프로젝트 개요
- 설치 방법 (`npm install`)
- 개발 서버 실행 (`npm run dev`)
- 빌드 (`npm run build`)
- 폴더 구조 설명
- 포함된 라이브러리 목록

최종 검증:

- [ ] `npm run dev` → http://localhost:3000 정상 표시
- [ ] 다크모드 토글 동작
- [ ] 샘플 Button 컴포넌트 렌더링
- [ ] `npm run build` 에러 없음
- [ ] `npm run format:check` 통과
- [ ] `npm run lint` 통과

---

## 최종 산출물 디렉토리 구조 (예상)

```
claude-nextjs-starterkit/
├── .env.example
├── .prettierrc
├── .prettierignore
├── .gitignore
├── components.json              # shadcn/ui
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── README.md
├── plan.md                      # ← 이 파일
├── public/
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── globals.css          # @import "tailwindcss";
    │   ├── layout.tsx           # ThemeProvider + Header + Footer
    │   └── page.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   └── Footer.tsx
    │   ├── ui/
    │   │   ├── button.tsx       # shadcn
    │   │   ├── input.tsx        # shadcn
    │   │   └── theme-toggle.tsx
    │   └── theme-provider.tsx
    ├── hooks/
    │   └── .gitkeep
    ├── lib/
    │   └── utils.ts             # cn() helper
    ├── types/
    │   └── env.d.ts
    ├── constants/
    │   └── .gitkeep
    └── stores/
        └── .gitkeep
```

---

## 제외된 항목 (의도적)

다음 항목들은 본 스타터 킷에서 **제외**합니다. 프로젝트별 필요에 따라 추후 추가:

- ❌ Zustand (전역 상태) — 필요 시점에 도입
- ❌ TanStack Query (서버 상태) — API 통신 발생 시 도입
- ❌ Zod + react-hook-form — 폼 사용 페이지 등장 시 도입
- ❌ 인증 시스템 (Auth.js, Clerk 등) — 로그인 요구 시 도입
- ❌ 테스트 프레임워크 (Vitest, Playwright) — 별도 결정 후 도입

---

## 보안 점검 (Phase 10 완료 후 수행)

CLAUDE.md OWASP Top 10 체크리스트:

- [ ] `.env.local`이 `.gitignore`에 포함
- [ ] 민감 정보 하드코딩 없음
- [ ] `dangerouslySetInnerHTML` 미사용
- [ ] Snyk MCP로 의존성 스캔
