import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../../model/types";
import { EdgeRouterMode } from "../../model/types";

export type EdgeService = ReturnType<typeof useEdgeService>;

export const useEdgeService = (graph: Graph, _ctx: UIEngineContext) => {
    const setEdgeRouterMode = (mode: EdgeRouterMode) => {
        graph.options.connecting.router = { name: mode };
        graph.getEdges().forEach((edge) => edge.setRouter(mode));
    };

    return {
        setEdgeRouterMode,
    };
};
