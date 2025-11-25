const isUCCtor = (x) => typeof x === "function" && Reflect.construct(String, [], x);
export const instantiateUseCases = (tree, ctx) => {
    const out = {};
    for (const key in tree) {
        const node = tree[key];
        if (isUCCtor(node)) {
            out[key] = ((payload) => {
                const uc = new node(ctx, key);
                const run = uc.run.bind(uc);
                const name = uc.name;
                return uc.runWithExecutor(name, run, payload);
            });
        }
        else {
            out[key] = instantiateUseCases(node, ctx);
        }
    }
    return out;
};
