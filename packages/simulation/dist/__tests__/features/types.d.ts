import { MockInstance } from "vitest";
export type WithDeepMocks<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] & MockInstance<T[K]> : T[K] extends object ? WithDeepMocks<T[K]> : T[K];
};
//# sourceMappingURL=types.d.ts.map