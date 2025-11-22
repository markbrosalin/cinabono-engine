import { isPublicApi, isApiToken } from "@engine/api/helpers";
import { buildCtx, composeUseCase } from "@engine/api/builder/helpers";
import { ExecutionEnv, RuntimeEnv } from "@engine/api/builder/types";
import { ApiToken, ApiCtx, ApiWrapper, EngineApi, ResolvedApi, ApiFnType } from "@engine/api/types";
import { BaseFn, BaseObj, PayloadOf, ResultOf } from "@cnbn/schema";
import { addNestedToPath, assignByPath, isPlainObject } from "@cnbn/utils";

const mergeWrappers = (global?: ApiWrapper[], local?: ApiWrapper[]) => [
    ...(global ?? []),
    ...(local ?? []),
];

export function buildApiTree(env: ExecutionEnv, parentCtx?: ApiCtx): EngineApi {
    const { globalWrappers, apiSpec, container } = env;

    const createInvoker = <T extends ApiToken<BaseFn>, Fn extends ApiFnType<T>>(
        usecase: ResolvedApi<T>,
        parentCtx?: ApiCtx
    ): Fn => {
        return ((...args: PayloadOf<Fn>): ResultOf<Fn> => {
            const wrappers = mergeWrappers(globalWrappers, usecase.wrappedBy);
            const runtimeEnv: RuntimeEnv = {
                ...env,
                api: api as EngineApi["api"],
                usecase,
                wrappers,
            };
            const ctx = buildCtx(runtimeEnv, parentCtx?.meta);

            // wrap core function with wrappers
            const composed = composeUseCase(runtimeEnv, ctx, () => usecase.factory(ctx));

            // capture the parent ctx in a closure
            ctx.api = buildApiTree(env, ctx).api;

            return composed(...args);
        }) as Fn;
    };

    // recuirsively traverse apiSpec and replace all UseCaseTokens with bound invokers
    const walk = <T>(spec: T, prefix = "") => {
        for (const key in spec) {
            const node = spec[key];
            const path = addNestedToPath(key, prefix);

            if (isApiToken(node)) {
                env.safeRunner.run(`api-builder:${node.name}`, () => {
                    const reg = container.resolve(node);

                    const usecase: ResolvedApi<typeof node> = {
                        factory: reg.factory,
                        wrappedBy: reg.wrappedBy,
                        token: node,
                        path,
                    };
                    const invoke = createInvoker(usecase, parentCtx);

                    assignByPath(api, path, invoke);
                    if (isPublicApi(node)) assignByPath(publicApi, path, invoke);
                });
            } else if (isPlainObject(node)) {
                walk(node, path);
            }
        }
    };

    const api: BaseObj = {};
    const publicApi: BaseObj = {};

    walk(apiSpec);

    return { api, publicApi } as EngineApi;
}
