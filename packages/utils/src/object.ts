/* eslint-disable @typescript-eslint/no-explicit-any */

import { isEmptyValue } from "@utils/filter";

export const flatValues = <T>(obj: Record<PropertyKey, T | T[]>): T[] => {
    return Object.values(obj).flat() as T[];
};

export const normalizeRecord = <T>(data: T | undefined): { data: T } | {} => {
    return !isEmptyValue(data) ? { data } : {};
};

export const pickNonEmpty = <T extends Record<PropertyKey, unknown>>(obj: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => !isEmptyValue(v))
    ) as Partial<T>;
};

export const snapshot = <T extends Record<PropertyKey, unknown>>(obj: T): T => structuredClone(obj);

export const cleanupEmptyMap = <T extends Record<string, unknown>>(obj: T, key: keyof T) => {
    delete obj[key];
    if (isEmptyValue(obj)) return true;
    return false;
};

export const processMany = <T, R>(items: T[] | T, fn: (item: T) => R): R[] | R => {
    if (Array.isArray(items)) {
        return items.map(fn);
    }
    return fn(items);
};

export const deepMerge = <T extends Record<PropertyKey, any>>(target: T, source: Partial<T>) => {
    for (const key of Object.keys(source)) {
        const tVal = target[key];
        const sVal = source[key];

        if (isPlainObject(tVal) && isPlainObject(sVal)) {
            (target as any)[key] = deepMerge(tVal, sVal);
        } else {
            (target as any)[key] = sVal;
        }
    }
};

export const isPlainObject = (v: unknown): v is Record<string, unknown> => {
    return v !== null && typeof v === "object" && !Array.isArray(v);
};
