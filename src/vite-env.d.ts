/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SHOW_COMING_SOON?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
