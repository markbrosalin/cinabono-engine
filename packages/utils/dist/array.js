export const isArrayOfArrays = (v) => Array.isArray(v) && Array.isArray(v[0]);
export const toArray = (v) => {
    return Array.isArray(v) ? v : [v];
};
export const typedEntries = (obj) => {
    return Object.entries(obj);
};
export const normalizeNested = (data) => {
    if (isArrayOfArrays(data)) {
        const flat = data.flat();
        const restoreChunks = (results) => rechunk(results, data);
        return { flat, isNested: true, restoreChunks };
    }
    else {
        const flat = data;
        const restoreChunks = (results) => results;
        return { flat, isNested: false, restoreChunks };
    }
};
export const rechunk = (flat, original) => {
    const result = [];
    let idx = 0;
    for (const group of original) {
        const size = group.length;
        result.push(flat.slice(idx, idx + size));
        idx += size;
    }
    return result;
};
export const omitAt = (arr, index) => {
    return arr.slice(index, index + 1);
};
export const spliceAt = (arr, index) => {
    arr.splice(index, 1);
};
