/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/deno" />

declare module "@remix-run/deno" {
  export interface AppLoadContext {
    countUp: () => Promise<void>;
  }
}

export {};
