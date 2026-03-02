import type { Graph } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { UIEngineContext } from "./context";
import type { UIEngineHooks } from "./lifecycle";

export type UIEngineLogicEngine = CinabonoClient;

export type UIEngineExternalContext = {
    logicEngine?: UIEngineLogicEngine;
    hooks?: UIEngineHooks;
};

export type UIEnginePlugin = {
    name: string;
    apply: (graph: Graph, ctx: UIEngineContext) => void | (() => void);
};
