/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TODOLY_DOC_TITLE: string;
  readonly TODOLY_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
