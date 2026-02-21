import type { Edge, Graph, Node } from "@antv/x6";
import type { EdgeRouterMode, LogicValueClass, UIEngineContext } from "../../model/types";
import { resolveEdgeEndpoints } from "../../lib";
import { useEdgeStateMap } from "../../presets-registry/useEdgeStateMap";

export type EdgeService = ReturnType<typeof useEdgeService>;

export const useEdgeService = (graph: Graph, _ctx: UIEngineContext) => {
    const edgeMap = useEdgeStateMap();

    const _resolveNode = (nodeId: string): Node | undefined => {
        const cell = graph.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    const _resolveEdgePath = (edge: Edge): Element | undefined => {
        const view = graph.findViewByCell(edge) as { container?: Element } | undefined;
        return view?.container?.querySelector?.("path.connection") ?? undefined;
    };

    const _ensureEdgeState = (edge: Edge): boolean => {
        if (edgeMap.get(edge)) return true;

        const path = _resolveEdgePath(edge);
        if (!path) return false;

        edgeMap.save(edge, path);
        return true;
    };

    const setEdgeValueClass = (edge: Edge, valueClass: LogicValueClass): void => {
        if (!_ensureEdgeState(edge)) return;
        edgeMap.updateValue(edge, valueClass);
    };

    const setIncomingPortValueClass = (
        nodeId: string,
        inputPortId: string,
        valueClass: LogicValueClass,
    ): void => {
        const node = _resolveNode(nodeId);
        if (!node) return;

        const connected = graph.getConnectedEdges(node) ?? [];
        connected.forEach((edge) => {
            const endpoints = resolveEdgeEndpoints(edge);
            if (!endpoints) return;

            if (endpoints.input.itemId !== nodeId) return;
            if (endpoints.input.portId !== inputPortId) return;

            setEdgeValueClass(edge, valueClass);
        });
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
