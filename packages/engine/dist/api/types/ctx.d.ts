import { ApiFromSpec, PublicApiFromSpec } from "../../api/types";
import { EngineDeps } from "../../engine/helpers";
import { ApiOpsFactory, FlowToolContract } from "../../use-cases";
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