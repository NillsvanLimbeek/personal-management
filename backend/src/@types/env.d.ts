declare namespace NodeJS {
    export interface ProcessEnv {
        LOCAL_DB: string;
        DATABASE: string;
        PORT: string;
        NODE_ENV: string;
    }
}
