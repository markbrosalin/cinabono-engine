import { AllApi } from "../../../use-casess/api-core/types/usecase-core";
import { openGlobalOperations, openTabOperations } from "../../../use-cases/operations";
import { openScopeOperations } from "@engine/use-casess/steps-helpers/scope.operations";
import { FlowToolContract } from "@engine/use-casess/tools";
import { BaseObj } from "@repo/schema";
import { ApiExecutorDeps, ApiTree } from "../../../use-casess/api-core/types";
import { PluginExtras } from "../../../enginee/plugin";
export type ApiCtx<T extends ApiTree, Deps extends BaseObj = BaseObj> = Pick<ApiExecutorDeps<T>, "core" | "factories" | "stores"> & {
    tools: ApiCtxTools;
    meta: ApiCtxMeta;
    deps: Readonly<Deps>;
    usecases: AllApi<T>;
    pluginExtras?: PluginExtras;
};
export interface ApiCtxTools {
    flow: FlowToolContract;
    globalOps: ReturnType<typeof openGlobalOperations>;
    tabOps: ReturnType<typeof openTabOperations>;
    scopeOps: ReturnType<typeof openScopeOperations>;
}
export interface ApiCtxMeta {
    path: string;
    ucName: string;
    traceId: string;
    spanId: string;
    parentId?: string;
    depth: number;
    maxDepth: number;
}
//# sourceMappingURL=usecase-context.d.ts.map