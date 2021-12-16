/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TODOLY_DOC_TITLE: string;
  readonly TODOLY_API_ENDPOINT: string;
  readonly TODOLY_APP_FAKE_LOADING_TIME: string;
  readonly TODOLY_API_TOKEN_EXPIRE_MILISECONDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
