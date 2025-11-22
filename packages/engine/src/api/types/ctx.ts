import { ApiSpec } from "@engine/api/token-spec";
import { ApiFromSpec, PublicApiFromSpec } from "@engine/api/types";
import { EngineDeps } from "@engine/engine/helpers";
import { ApiOpsFactory, FlowToolContract } from "@engine/use-cases";

export type EngineApi = {
    api: ApiFromSpec<ApiSpec>;
    publicApi: PublicApiFromSpec<ApiSpec>;
};

export type ApiCtx = {
    api: ApiFromSpec<ApiSpec>;
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

    depth: number; // number of nested calls
    maxDepth: number;
};
