/// <reference types="@rsbuild/core/types" />
declare namespace NodeJS {
    interface ProcessEnv {
        PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    }
}
interface ImportMetaEnv {
    readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
