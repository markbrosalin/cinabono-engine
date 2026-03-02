/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Graph } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { ServiceContext } from "../../lib/registry/types";
import type {
    UIEngineSharedServiceGetter,
    UIEngineSharedServiceName,
    UIEngineSharedServices,
} from "../../shared-services";

export type UIEngineLogicEngine = CinabonoClient;

export type UIEngineExternalContext = {
    logicEngine?: UIEngineLogicEngine;
};

export type UIEngineComponentExternal<TExternal extends object = {}> = UIEngineExternalContext &
    TExternal;

export type UIEngineComponentDeps<TExternal extends object = {}> = {
    external: UIEngineComponentExternal<TExternal>;
    getSharedService: UIEngineSharedServiceGetter;
};

export type UIEngineComponentServiceContext<
    TExternal extends object,
    TServiceName extends string,
    TServices extends Record<TServiceName, unknown>,
> = ServiceContext<
    UIEngineComponentExternal<TExternal>,
    TServiceName,
    TServices,
    UIEngineSharedServiceName,
    UIEngineSharedServices
>;

export type UIEngineContext = UIEngineComponentServiceContext<{}, string, Record<string, any>>;

export type UIEnginePlugin = {
    name: string;
    apply: (graph: Graph, ctx: UIEngineContext) => void | (() => void);
};
