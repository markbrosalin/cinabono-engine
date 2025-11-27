export const size = (v) => {
    if (v == null)
        return 0;
    if (Array.isArray(v))
        return v.length;
    if (v instanceof Map || v instanceof Set)
        return v.size;
    if (typeof v === "object")
        return Object.keys(v).length;
    return 0;
};
