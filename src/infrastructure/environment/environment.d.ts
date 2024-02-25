declare global {
  namespace NodeJ {
    interface ProcessEnv {
      PG_HOST:string;
      PG_DATABASE:string;
      PG_USER:string;
      PG_PASSWORD:string;
      PORT_SERVER: string;
    }
  }
}

declare module 'dotenv/config'
export {};