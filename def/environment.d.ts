export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_RPC_URL: string;
      NEXT_PUBLIC_PACKAGE_ID: string;
      NEXT_PUBLIC_TWITTER_ID: string;
      NEXT_PUBLIC_RESERVE_ID: string;
    }
  }
}
