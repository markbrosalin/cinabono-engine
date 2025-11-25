export const definePlugin = () => { };
export const createToken = (description) => ({
    key: Symbol(description),
    description,
});
export const createPluginExtras = () => {
    const map = new Map();
    return {
        get: (t) => map.get(t.key),
        set: (t, value) => {
            map.set(t.key, value);
        },
        has: (t) => map.has(t.key),
    };
};
