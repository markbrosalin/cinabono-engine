import { genSpanId, genTraceId } from "../../../api/builder/helpers/index.js";
import { EVENT_PATTERN_GROUPS } from "../../../eventBus/index.js";
import { DefaultFlowTool, ApiOpsFactory } from "../../../use-cases/index.js";
import { getGlobalCfg } from "@cnbn/config";
export function buildCtx(env, parentMeta) {
    const { deps, api, usecase, opts } = env;
    const depth = (parentMeta?.depth ?? 0) + 1;
    const maxDepth = opts?.maxLoopedCalls ?? getGlobalCfg().api.maxLoopDepth;
    if (depth > maxDepth) {
        throw new Error(`Max depth ${maxDepth} exceeded at ${usecase.path}`);
    }
    const flowBus = deps.core.bus.narrow(EVENT_PATTERN_GROUPS.flowTool);
    const flow = new DefaultFlowTool(usecase.token.name, flowBus);
    const apiOps = ApiOpsFactory(flow, deps.stores);
    return {
        tools: { flow, ...apiOps },
        deps,
        api,
        meta: {
            traceId: parentMeta?.traceId ?? genTraceId(),
            spanId: genSpanId(),
            parentId: parentMeta?.spanId,
            depth,
            maxDepth,
            ucName: usecase.token.name,
            path: usecase.path,
        },
    };
}
