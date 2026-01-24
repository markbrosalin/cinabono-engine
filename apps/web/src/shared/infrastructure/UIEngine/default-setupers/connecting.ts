import { Graph, Shape, routerPresets } from "@antv/x6";
import type { Cell } from "@antv/x6/lib/model";
import type { Connecting, ValidateConnectionArgs } from "@antv/x6/lib/graph/options";
import { decodePortId } from "../adapters/ports";
import type { EdgeRouterMode, PinSide } from "../types";
import { EDGE_CORNER_RADIUS, EDGE_STROKE_WIDTH } from "../services/edges/constants";

const isPortMagnet = (magnet?: Element | null): boolean => {
    if (!magnet) return false;
    return magnet.getAttribute("magnet") === "true";
};

const getPortKind = (portId?: string | null, magnet?: Element | null): PinSide | null => {
    if (portId) return decodePortId(portId).side === "right" ? "output" : "input";
    if (!magnet) return null;
    if (magnet.classList.contains("port-output")) return "output";
    if (magnet.classList.contains("port-input")) return "input";
    return null;
};

const hasIncomingOnPort = (
    graph: Graph,
    targetCell: Cell,
    targetPort?: string | null,
    edgeId?: string | null,
) => {
    if (!targetPort) return true;
    const incoming = graph.getIncomingEdges(targetCell) ?? [];
    return incoming.some((edge) => {
        if (edgeId && edge.id === edgeId) return false;
        return edge.getTargetPortId() === targetPort;
    });
};

const normalizeConnection = (args: ValidateConnectionArgs) => {
    const { sourceCell, targetCell, sourcePort, targetPort, sourceMagnet, targetMagnet } = args;
    if (!sourceCell || !targetCell || !sourcePort || !targetPort) return null;
    const sourceKind = getPortKind(sourcePort, sourceMagnet);
    const targetKind = getPortKind(targetPort, targetMagnet);
    if (!sourceKind || !targetKind) return null;

    if (sourceKind === "output" && targetKind === "input") {
        return {
            inputCell: targetCell,
            inputPort: targetPort,
            outputCell: sourceCell,
            outputPort: sourcePort,
        };
    }

    if (sourceKind === "input" && targetKind === "output") {
        return {
            inputCell: sourceCell,
            inputPort: sourcePort,
            outputCell: targetCell,
            outputPort: targetPort,
        };
    }

    return null;
};

const isValidConnection = (graph: Graph, args: ValidateConnectionArgs): boolean => {
    const { sourceMagnet, targetMagnet, edge } = args;
    if (!isPortMagnet(sourceMagnet) || !isPortMagnet(targetMagnet)) return false;

    const normalized = normalizeConnection(args);
    if (!normalized) return false;
    if (hasIncomingOnPort(graph, normalized.inputCell, normalized.inputPort, edge?.id))
        return false;
    return true;
};

const resolveRouterName = (graph: Graph, fallback: EdgeRouterMode): EdgeRouterMode => {
    const router = graph.options.connecting?.router;
    if (!router) return fallback;
    if (typeof router === "string") return router as EdgeRouterMode;
    if (typeof router === "object" && "name" in router)
        return (router.name ?? fallback) as EdgeRouterMode;
    return fallback;
};

const createCustomEdge = (graph: Graph, routerMode: EdgeRouterMode) => {
    const edge = new Shape.Edge({
        attrs: {
            line: {
                class: "connection signal-x",
                strokeWidth: EDGE_STROKE_WIDTH,
                targetMarker: false,
                sourceMarker: false,
            },
        },
        router: graph.options.connecting?.router ?? { name: routerMode },
        zIndex: 0,
    });

    return edge;
};

export const createConnectingConfig = (
    routerMode: EdgeRouterMode = "manhattan",
): Partial<Connecting> => ({
    allowBlank: true,
    allowNode: false,
    allowEdge: false,
    allowPort: true,
    allowLoop: true,
    router: {
        args: {
            padding: 8,
            snapToGrid: true,
            merge: true,
            perpendicular: true,
            step: 8,
            maxLoopCount: 500,
            maxDirectionChange: 90,
            startDirections: ["right", "left"],
            endDirections: ["left", "right"],
            fallbackRouter: routerPresets.orth,
        },
        name: routerMode,
    },
    connector: {
        name: "jumpover",
        args: { size: 6, type: "gap", radius: EDGE_CORNER_RADIUS },
    },
    targetConnectionPoint: { name: "anchor", args: { offset: 0 } },
    connectionPoint: { name: "anchor", args: { offset: 0 } },
    snap: { anchor: "center", radius: 16 },

    createEdge() {
        return createCustomEdge(this, resolveRouterName(this, routerMode));
    },

    validateConnection(args) {
        console.log("here validateConnection");
        return isValidConnection(this, args);
    },

    validateEdge({ edge }) {
        console.log("here validateEdge");
        const sourceCell = edge.getSourceCell();
        const targetCell = edge.getTargetCell();
        if (!sourceCell || !targetCell) return false;

        const sourcePort = edge.getSourcePortId();
        const targetPort = edge.getTargetPortId();
        if (!sourcePort || !targetPort) return false;

        const normalized = normalizeConnection({
            sourceCell,
            targetCell,
            sourcePort,
            targetPort,
        });
        if (!normalized) return false;
        if (hasIncomingOnPort(this, normalized.inputCell, normalized.inputPort, edge.id))
            return false;
        return true;
    },
});
