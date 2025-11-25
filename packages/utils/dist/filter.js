export const isEmptyValue = (v) => {
    if (v == null)
        return true;
    if (Array.isArray(v))
        return v.length === 0;
    if (v instanceof Map || v instanceof Set)
        return v.size === 0;
    if (typeof v === "object")
        return Object.keys(v).length === 0;
    return false;
};
