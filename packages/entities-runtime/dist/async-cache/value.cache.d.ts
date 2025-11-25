export declare class AsyncCacheValue<T> {
    private readonly _builder;
    private _value?;
    constructor(_builder: () => Promise<T>);
    get(): Promise<T>;
    warm(): void;
    invalidate(): void;
    clear(): void;
}
//# sourceMappingURL=value.cache.d.ts.map