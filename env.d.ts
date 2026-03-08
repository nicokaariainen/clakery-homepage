/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STATICFORMS_ACCESS_KEY: string
  readonly VITE_RECIPIENT_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
