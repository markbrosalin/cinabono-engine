export declare const isArrayOfArrays: (v: unknown) => v is unknown[][];
export declare const toArray: <T>(v: T | T[]) => T[];
export declare const typedEntries: <T extends object>(obj: T) => [keyof T, T[keyof T]][];
export declare const normalizeNested: <T>(data: T[][] | T[]) => {
    flat: T[];
    isNested: true;
    restoreChunks: (results: T[]) => T[][];
} | {
    flat: T[];
    isNested: false;
    restoreChunks: (results: T[]) => T[];
};
export declare const rechunk: <T>(flat: T[], original: T[][]) => T[][];
export declare const omitAt: <T>(arr: T[], index: number) => T[];
export declare const spliceAt: <T>(arr: T[], index: number) => void;
//# sourceMappingURL=array.d.ts.map