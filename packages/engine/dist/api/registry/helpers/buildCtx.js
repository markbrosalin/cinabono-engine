import { genSpanId, genTraceId } from "../../../api/registry/helpers/idGen";
import { getGlobalCfg } from "@repo/config";
export function buildCtx(env, parentMeta) {
    const depth = (parentMeta?.depth ?? 0) + 1;
    const maxDepth = parentMeta?.maxDepth ?? env.options?.maxLoopDepth ?? getGlobalCfg().api.maxLoopDepth;
    if (depth > maxDepth) {
        throw new Error(`Max depth ${maxDepth} exceeded at ${env.entry.path}`);
    }
    return {
        api: env.api,
        meta: {
            traceId: parentMeta?.traceId ?? genTraceId(),
            spanId: genSpanId(),
            parentId: parentMeta?.spanId,
            depth,
            maxDepth,
            ucName: env.entry.name,
            path: env.entry.path,
        },
    };
}
