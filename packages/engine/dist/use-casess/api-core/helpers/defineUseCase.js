export const defineUseCase = (name) => {
    function withDeps(deps) {
        function buildPublic(factory) {
            const meta = {
                name,
                deps,
                visibility: "public",
                middlewares: [],
            };
            const uc = ((ctx) => factory(ctx));
            uc.__meta__ = meta;
            uc.wrappedWith = (...mw) => {
                uc.__meta__.middlewares.push(...mw);
                return uc;
            };
            return uc;
        }
        function buildInternal(factory) {
            const meta = {
                name,
                deps,
                visibility: "internal",
                middlewares: [],
            };
            const uc = ((ctx) => factory(ctx));
            uc.__meta__ = meta;
            uc.wrappedWith = (...mw) => {
                uc.__meta__.middlewares.push(...mw);
                return uc;
            };
            return uc;
        }
        return { public: buildPublic, internal: buildInternal };
    }
    // шорткаты без deps
    return {
        withDeps,
        public: withDeps({}).public,
        internal: withDeps({}).internal,
    };
};
