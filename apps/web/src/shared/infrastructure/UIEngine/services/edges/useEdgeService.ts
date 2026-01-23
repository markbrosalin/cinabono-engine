import type { Accessor } from "solid-js";
import type { Graph, Edge } from "@antv/x6";
import type { EdgeRouterMode } from ".";
import { applyEdgeSignalFromSource } from "./signals";
import { toggleEdgeEditTools } from "./tools";

export type EdgeService = ReturnType<typeof useEdgeService>;

export const useEdgeService = (graph: Accessor<Graph | undefined>) => {
    const setEdgeRouterMode = (mode: EdgeRouterMode) => {
        const g = graph();
        if (!g) return;
        g.options.connecting.router = { name: mode };
        g.getEdges().forEach((edge) => edge.setRouter(mode));
    };

    const updateEdgeSignalFromSource = (edge: Edge) => {
        const sourceCell = edge.getSourceCell();
        const sourcePort = edge.getSourcePortId();
        if (!sourceCell || !sourceCell.isNode?.()) return;
        applyEdgeSignalFromSource(edge, sourceCell, sourcePort);
    };

    return {
        setEdgeRouterMode,
        updateEdgeSignalFromSource,
        toggleEdgeEditTools,
    };
};
