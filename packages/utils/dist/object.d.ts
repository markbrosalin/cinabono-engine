export declare const flatValues: <T>(obj: Record<PropertyKey, T | T[]>) => T[];
export declare const normalizeRecord: <T>(data: T | undefined) => {
    data: T;
} | {};
export declare const pickNonEmpty: <T extends Record<PropertyKey, unknown>>(obj: T) => Partial<T>;
export declare const snapshot: <T extends Record<PropertyKey, unknown>>(obj: T) => T;
export declare const cleanupEmptyMap: <T extends Record<string, unknown>>(obj: T, key: keyof T) => boolean;
export declare const processMany: <T, R>(items: T[] | T, fn: (item: T) => R) => R[] | R;
export declare const deepMerge: <T extends Record<PropertyKey, any>>(target: T, source: Partial<T>) => void;
export declare const isPlainObject: (v: unknown) => v is Record<string, unknown>;
//# sourceMappingURL=object.d.ts.map