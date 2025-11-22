import { RuntimeEnv } from "@engine/api/builder/types/env";
import { ApiCtx } from "@engine/api/types";
import { EVENT_PATTERN_GROUPS } from "@engine/eventBus";
import { BaseFn, PayloadOf, ResultOf } from "@cnbn/schema";

const getApiRegEmit = (env: RuntimeEnv) => {
    const parentBus = env.deps.core.bus;
    const bus = parentBus.narrow(EVENT_PATTERN_GROUPS.apiBuilder);
    return bus.emit.bind(bus);
};

export function composeUseCase<Fn extends BaseFn>(
    env: RuntimeEnv,
    ctx: ApiCtx,
    factory: () => Fn
): Fn {
    const { wrappers } = env;
    const meta = ctx.meta;
    const emit = getApiRegEmit(env);

    const run = ((...payload: PayloadOf<Fn>): ResultOf<Fn> => {
        let idx = -1;

        const dispatch = (i: number, ...args: PayloadOf<Fn>): ResultOf<Fn> => {
            if (i <= idx) throw new Error("next() called multiple times");
            idx = i;

            // core logic
            if (i === wrappers.length) {
                emit("api.useCaseFn.start", { payload: args, ...meta });

                try {
                    const coreFn = factory();
                    const result = coreFn(...args);

                    emit("api.useCaseFn.finish", { result, ...meta });
                    return result;
                } catch (error) {
                    emit("api.useCaseFn.error", { error, ...meta });
                    ctx.tools.flow.rollbackSteps();
                    throw error;
                }
            }

            // wrapper layer
            const wp = wrappers[i];
            const wrapperName = wp.__name__;
            emit("api.wrapper.start", { payload: args, wrapperName, ...meta });

            const next = (...nextArgs: PayloadOf<Fn>): ResultOf<Fn> =>
                dispatch(i + 1, ...(nextArgs.length ? nextArgs : args));

            try {
                const out = wp(ctx, next);
                emit("api.wrapper.finish", { result: out, wrapperName, ...meta });
                return out;
            } catch (error) {
                emit("api.wrapper.error", { error, ...meta });
                throw error;
            }
        };

        try {
            emit("api.useCase.start", { payload, ...meta });
            const result = dispatch(0, ...payload);
            emit("api.useCase.finish", { result, ...meta });
            return result;
        } catch (error) {
            emit("api.useCase.error", { error, ...meta });
            throw error;
        }
    }) as Fn;

    return run;
}
