declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** 사이트 기본 URL (예: http://localhost:3000) */
      NEXT_PUBLIC_SITE_URL?: string
    }
  }
}

export {}
