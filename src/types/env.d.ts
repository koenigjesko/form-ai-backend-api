/**
 * @deprecated
 * 
 * When `include`ing this module in a tsconfig this 
 * interop compilation and needs to be solved.
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOSTNAME: string;
      PORT: number;
      DATABASE_FILE: string;
      DATABASE_SCHEMA: string;
    }
  }
}
