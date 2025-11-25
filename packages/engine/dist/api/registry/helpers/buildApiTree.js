/* eslint-disable @typescript-eslint/no-explicit-any */
import { assignByPath, isPublicUseCase } from "../../../api/helpers";
import { buildCtx, composeUseCase } from "../../../api/registry/helpers";
const mergeWrappers = (global, local) => [...(global ?? []), ...(local ?? [])];
export function buildApiTree(env, parentCtx) {
    const { globalWrappers, entries } = env;
    const api = {};
    const publicApi = {};
    const createInvoker = (entry, parentCtx) => {
        return (...args) => {
            const wrappers = mergeWrappers(globalWrappers, entry.wrappers);
            const runtimeEnv = { ...env, api: api, entry, wrappers };
            const ctx = buildCtx(runtimeEnv, parentCtx?.meta);
            // wrap core function with wrappers
            const composed = composeUseCase(runtimeEnv, ctx, () => entry.factory(ctx));
            // capture the parent ctx in a closure
            ctx.api = buildApiTree(env, ctx).api;
            return composed(...args);
        };
    };
    // assign invoker to the api
    for (const entry of entries) {
        const invoke = createInvoker(entry, parentCtx);
        assignByPath(api, entry.path, invoke);
        if (isPublicUseCase(entry))
            assignByPath(publicApi, entry.path, invoke);
    }
    return {
        api: api,
        publicApi: publicApi,
    };
}
