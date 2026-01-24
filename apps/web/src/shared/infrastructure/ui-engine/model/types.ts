import type { Graph } from "@antv/x6";

export type UIEngineContext = Record<string, unknown>;

export type UIEnginePlugin = {
    name: string;
    apply: (graph: Graph, ctx: UIEngineContext) => void | (() => void);
};

export type EdgeRouterMode = "manhattan" | "metro";
