/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// This is a workaround for the global process variable
interface Process {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';
  };
}

declare var process: Process;
