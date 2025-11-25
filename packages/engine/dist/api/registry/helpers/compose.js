function withMetaEmit(env, meta) {
    return (event, data) => env.bus.emit(event, { ...meta, ...data });
}
export function composeUseCase(env, ctx, factory) {
    const { wrappers } = env;
    const meta = ctx.meta;
    const emit = withMetaEmit(env, meta);
    const run = ((...payload) => {
        let idx = -1;
        const dispatch = (i, ...args) => {
            if (i <= idx)
                throw new Error("next() called multiple times");
            idx = i;
            // core logic
            if (i === wrappers.length) {
                emit("core.usecase.coreFn.start", { payload: args });
                const coreFn = factory();
                const result = coreFn(...args);
                emit("core.usecase.coreFn.finish", { result });
                return result;
            }
            // wrapper layer
            const wp = wrappers[i];
            const wrapperName = wp.__name__;
            emit("core.wrapper.start", { payload: args, wrapperName });
            const next = (...nextArgs) => dispatch(i + 1, ...(nextArgs.length ? nextArgs : args));
            const out = wp(ctx, next);
            emit("core.wrapper.finish", { result: out, wrapperName });
            return out;
        };
        try {
            emit("core.usecase.start", { payload });
            const result = dispatch(0, ...payload);
            emit("core.usecase.finish", { result });
            return result;
        }
        catch (error) {
            emit("core.usecase.error", { error });
            throw error;
        }
    });
    return run;
}
