import { EVENT_PATTERN_GROUPS } from "../../../eventBus/index.js";
const getApiRegEmit = (env) => {
    const parentBus = env.deps.core.bus;
    const bus = parentBus.narrow(EVENT_PATTERN_GROUPS.apiBuilder);
    return bus.emit.bind(bus);
};
export function composeUseCase(env, ctx, factory) {
    const { wrappers } = env;
    const meta = ctx.meta;
    const emit = getApiRegEmit(env);
    const run = ((...payload) => {
        let idx = -1;
        const dispatch = (i, ...args) => {
            if (i <= idx)
                throw new Error("next() called multiple times");
            idx = i;
            // core logic
            if (i === wrappers.length) {
                emit("api.useCaseFn.start", { payload: args, ...meta });
                try {
                    const coreFn = factory();
                    const result = coreFn(...args);
                    emit("api.useCaseFn.finish", { result, ...meta });
                    return result;
                }
                catch (error) {
                    emit("api.useCaseFn.error", { error, ...meta });
                    ctx.tools.flow.rollbackSteps();
                    throw error;
                }
            }
            // wrapper layer
            const wp = wrappers[i];
            const wrapperName = wp.__name__;
            emit("api.wrapper.start", { payload: args, wrapperName, ...meta });
            const next = (...nextArgs) => dispatch(i + 1, ...(nextArgs.length ? nextArgs : args));
            try {
                const out = wp(ctx, next);
                emit("api.wrapper.finish", { result: out, wrapperName, ...meta });
                return out;
            }
            catch (error) {
                emit("api.wrapper.error", { error, ...meta });
                throw error;
            }
        };
        try {
            emit("api.useCase.start", { payload, ...meta });
            const result = dispatch(0, ...payload);
            emit("api.useCase.finish", { result, ...meta });
            return result;
        }
        catch (error) {
            emit("api.useCase.error", { error, ...meta });
            throw error;
        }
    });
    return run;
}
