export const defineUseCase = (name) => {
    const baseMeta = {
        deps: {},
        middlewares: [],
        name,
    };
    function runFn(fn) {
        return makeUseCase(fn, baseMeta);
    }
    function withDeps(deps) {
        const meta = { ...baseMeta, deps };
        return {
            runFn(fn) {
                return makeUseCase(fn, meta);
            },
        };
    }
    // common builder
    return { withDeps, runFn };
    function makeUseCase(fn, meta) {
        const wrapped = ((ctx) => fn(ctx));
        wrapped.__meta__ = meta;
        wrapped.wrappedWith = (...mw) => {
            meta.middlewares.push(...mw);
            return wrapped;
        };
        return wrapped;
    }
};
