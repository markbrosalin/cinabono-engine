import { isPublicApi, isApiToken } from "../../../api/helpers/index.js";
import { buildCtx, composeUseCase } from "../../../api/builder/helpers/index.js";
import { addNestedToPath, assignByPath, isPlainObject } from "@cnbn/utils";
const mergeWrappers = (global, local) => [
    ...(global ?? []),
    ...(local ?? []),
];
export function buildApiTree(env, parentCtx) {
    const { globalWrappers, apiSpec, container } = env;
    const createInvoker = (usecase, parentCtx) => {
        return ((...args) => {
            const wrappers = mergeWrappers(globalWrappers, usecase.wrappedBy);
            const runtimeEnv = {
                ...env,
                api: api,
                usecase,
                wrappers,
            };
            const ctx = buildCtx(runtimeEnv, parentCtx?.meta);
            // wrap core function with wrappers
            const composed = composeUseCase(runtimeEnv, ctx, () => usecase.factory(ctx));
            // capture the parent ctx in a closure
            ctx.api = buildApiTree(env, ctx).api;
            return composed(...args);
        });
    };
    // recuirsively traverse apiSpec and replace all UseCaseTokens with bound invokers
    const walk = (spec, prefix = "") => {
        for (const key in spec) {
            const node = spec[key];
            const path = addNestedToPath(key, prefix);
            if (isApiToken(node)) {
                env.safeRunner.run(`api-builder:${node.name}`, () => {
                    const reg = container.resolve(node);
                    const usecase = {
                        factory: reg.factory,
                        wrappedBy: reg.wrappedBy,
                        token: node,
                        path,
                    };
                    const invoke = createInvoker(usecase, parentCtx);
                    assignByPath(api, path, invoke);
                    if (isPublicApi(node))
                        assignByPath(publicApi, path, invoke);
                });
            }
            else if (isPlainObject(node)) {
                walk(node, path);
            }
        }
    };
    const api = {};
    const publicApi = {};
    walk(apiSpec);
    return { api, publicApi };
}
