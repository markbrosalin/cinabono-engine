import type { Graph } from "@antv/x6";
import type { UIEngineContext } from "../../model/types";
import { EdgeRouterMode } from "../../model/types";

export type EdgeService = ReturnType<typeof useEdgeService>;

export const useEdgeService = (graph: Graph, _ctx: UIEngineContext) => {
    const setEdgeRouterMode = (mode: EdgeRouterMode) => {
        graph.options.connecting.router = { name: mode };
        graph.getEdges().forEach((edge) => edge.setRouter(mode));
    };

    // const updateEdgeSignalFromSource = (edge: Edge) => {
    //     const sourceCell = edge.getSourceCell();
    //     const sourcePort = edge.getSourcePortId();
    //     if (!sourceCell || !sourceCell.isNode?.()) return;
    //     applyEdgeLogicValueFromSource(edge, sourceCell, sourcePort);
    // };

    return {
        setEdgeRouterMode,
        // updateEdgeSignalFromSource,
    };
};
