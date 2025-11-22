import { genSpanId, genTraceId } from "@engine/api/builder/helpers";
import { RuntimeEnv } from "@engine/api/builder/types";

import { ApiCtx } from "@engine/api/types";
import { EVENT_PATTERN_GROUPS } from "@engine/eventBus";
import { DefaultFlowTool, ApiOpsFactory } from "@engine/use-cases";
import { getGlobalCfg } from "@cnbn/config";

export function buildCtx(env: RuntimeEnv, parentMeta?: ApiCtx["meta"]): ApiCtx {
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
    } as const;
}
