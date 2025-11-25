export const ApiFactories = {
    config: (fn) => fn,
    token: (name, visibility) => ({
        visibility,
        name,
        id: Symbol(name),
        __type__: undefined,
    }),
    wrapper: (name, fn) => {
        fn.__name__ = name;
        return fn;
    },
};
