export const ucSpec = {
    public: (meta) => ({
        visibility: "public",
        ...meta,
    }),
    internal: (meta) => ({
        visibility: "internal",
        ...meta,
    }),
};
export function defineUseCase({ factory, wrappedBy }) {
    return {
        factory,
        wrappers: wrappedBy,
    };
}
export function defineWrapper(name, fn) {
    fn.__name__ = name;
    return fn;
}
