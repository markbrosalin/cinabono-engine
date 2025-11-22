export const isArrayOfArrays = (v: unknown): v is unknown[][] =>
    Array.isArray(v) && Array.isArray(v[0]);

export const toArray = <T>(v: T | T[]): T[] => {
    return Array.isArray(v) ? v : [v];
};

export const typedEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
};

export const normalizeNested = <T>(data: T[][] | T[]) => {
    if (isArrayOfArrays(data)) {
        const flat = data.flat();
        const restoreChunks = (results: T[]) => rechunk(results, data);
        return { flat, isNested: true as const, restoreChunks };
    } else {
        const flat = data as T[];
        const restoreChunks = (results: T[]) => results;
        return { flat, isNested: false as const, restoreChunks };
    }
};

export const rechunk = <T>(flat: T[], original: T[][]): T[][] => {
    const result: T[][] = [];
    let idx = 0;

    for (const group of original) {
        const size = group.length;
        result.push(flat.slice(idx, idx + size));
        idx += size;
    }

    return result;
};

export const omitAt = <T>(arr: T[], index: number): T[] => {
    return arr.slice(index, index + 1);
};

export const spliceAt = <T>(arr: T[], index: number) => {
    arr.splice(index, 1);
};
