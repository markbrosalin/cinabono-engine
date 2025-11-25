export interface CacheValueControls<K> {
    get(): Promise<K>;
    warm(): void;
    invalidate(): void;
    clear(): void;
}
export interface CacheMapControls<K> {
    get(key: K): Promise<K>;
    warm(key: K): void;
    invalidate(key: K): void;
    clear(): void;
}
//# sourceMappingURL=types.d.ts.map