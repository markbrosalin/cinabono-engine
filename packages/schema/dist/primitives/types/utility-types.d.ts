import { BaseFn } from "./base";
export type Flatten<T> = {
    [Key in keyof T]: T[Key];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Entries<K, V> = ReadonlyArray<readonly [K, V]>;
export type AllOrNothing<T> = T | {
    [K in keyof T]?: never;
};
export type DeepPartial<T> = Partial<{
    [K in keyof T]: DeepPartial<T[K]>;
}>;
export type DeepRequired<T> = {
    [K in keyof T]: Required<T[K]>;
};
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type MaybeArray<T> = T | T[];
export type ElementOf<A> = A extends (infer U)[] ? U : A;
export type MaybePromise<T> = T | Promise<T>;
export type AsPromise<F extends (...args: any[]) => any> = (...args: Parameters<F>) => Promise<ReturnType<F>>;
export type AsFactory<T, Args extends any[] = []> = (...args: Args) => T;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type PayloadOf<T> = T extends BaseFn ? Parameters<T> : never;
export type ResultOf<T> = T extends BaseFn ? ReturnType<T> : never;
//# sourceMappingURL=utility-types.d.ts.map