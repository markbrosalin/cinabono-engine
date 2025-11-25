export declare class AsyncCacheMap<K, V> {
    private readonly _builder;
    private _cache;
    constructor(_builder: (key: K) => Promise<V>);
    get(key: K): Promise<V>;
    warm(key: K): void;
    invalidate(key: K): void;
    clear(): void;
}
//# sourceMappingURL=map.cache.d.ts.map