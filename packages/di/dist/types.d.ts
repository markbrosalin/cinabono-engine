type Ctor<T> = new (...args: any[]) => T;
export type AnyObj = Record<string, any>;
export type DiTokenTree = AnyObj;
export type DiToken<Type = unknown> = {
    id: symbol;
    name: string;
    __type__: Type;
};
export type DiLifeTime = "singleton" | "transient";
export type DiResolve = <U>(t: DiToken<U>) => U;
export type BaseDiConfig<T extends DiToken = DiToken> = {
    token: T;
    lifetime?: DiLifeTime;
    options?: {
        allowOverride?: boolean;
    };
};
export type DiConfig<T extends DiToken = DiToken> = BaseDiConfig<T> & ({
    useValue: T["__type__"];
} | {
    useClass: Ctor<T["__type__"]>;
} | {
    useFactory: (resolve: DiResolve) => T["__type__"];
});
export type BindTokensToInstances<T extends DiTokenTree> = {
    [K in keyof T]: T[K] extends DiToken<infer U> ? U : T[K] extends Record<string, any> ? BindTokensToInstances<T[K]> : never;
};
export {};
//# sourceMappingURL=types.d.ts.map