declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOSTNAME: string;
      PORT: number;
      DATABASE_PATH: string;
    }
  }
}
