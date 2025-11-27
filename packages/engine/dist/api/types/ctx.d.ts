import { ApiFromSpec, PublicApiFromSpec } from "../../api/types/index.js";
import { EngineDeps } from "../../engine/helpers/index.js";
import { ApiOpsFactory, FlowToolContract } from "../../use-cases/index.js";
export type EngineApi = {
    api: ApiFromSpec;
    publicApi: PublicApiFromSpec;
};
export type ApiCtx = {
    api: ApiFromSpec;
    meta: ApiCtxMeta;
    deps: EngineDeps;
    tools: ApiTools;
};
export interface ApiTools extends ApiOps {
    flow: FlowToolContract;
}
type ApiOps = ReturnType<typeof ApiOpsFactory>;
export type ApiCtxMeta = {
    traceId: string;
    spanId: string;
    parentId?: string;
    path: string;
    ucName: string;
    depth: number;
    maxDepth: number;
};
export {};
//# sourceMappingURL=ctx.d.ts.map