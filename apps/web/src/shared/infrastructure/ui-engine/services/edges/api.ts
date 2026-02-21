import type { Graph } from "@antv/x6";
import type { EdgeRouterMode, LogicValueClass, UIEngineContext } from "../../model/types";
import { useEdgeStateMap } from "../../presets-registry/useEdgeStateMap";
import { usePortStateMap } from "../../presets-registry/usePortStateMap";

export type EdgeService = ReturnType<typeof useEdgeService>;

export const useEdgeService = (graph: Graph, ctx: UIEngineContext) => {
    const edgeMap = useEdgeStateMap();

    const setIncomingPortValueClass = (
        nodeId: string,
        toPortId: string,
        valueClass: LogicValueClass,
    ): void => {
        const node = ctx.getService?.("nodes").getNode(nodeId);
        if (!node) return;

        const portState = usePortStateMap().get(node, toPortId);

        if (!portState || !portState.edge) return;

        edgeMap.updateValue(portState.edge, valueClass);
    };

    const setEdgeRouterMode = (mode: EdgeRouterMode) => {
        graph.options.connecting.router = { name: mode };
        graph.getEdges().forEach((edge) => edge.setRouter(mode));
    };

    return {
        setEdgeRouterMode,
        setIncomingPortValueClass,
    };
};
