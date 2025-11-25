/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmptyValue } from "./filter";
export const flatValues = (obj) => {
    return Object.values(obj).flat();
};
export const normalizeRecord = (data) => {
    return !isEmptyValue(data) ? { data } : {};
};
export const pickNonEmpty = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => !isEmptyValue(v)));
};
export const snapshot = (obj) => structuredClone(obj);
export const cleanupEmptyMap = (obj, key) => {
    delete obj[key];
    if (isEmptyValue(obj))
        return true;
    return false;
};
export const processMany = (items, fn) => {
    if (Array.isArray(items)) {
        return items.map(fn);
    }
    return fn(items);
};
export const deepMerge = (target, source) => {
    for (const key of Object.keys(source)) {
        const tVal = target[key];
        const sVal = source[key];
        if (isPlainObject(tVal) && isPlainObject(sVal)) {
            target[key] = deepMerge(tVal, sVal);
        }
        else {
            target[key] = sVal;
        }
    }
};
export const isPlainObject = (v) => {
    return v !== null && typeof v === "object" && !Array.isArray(v);
};
