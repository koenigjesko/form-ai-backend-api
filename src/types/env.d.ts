// This isn't working and can be removed.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOSTNAME: string;
      PORT: number;
      DATABASE_PATH: string;
    }
  }
}
