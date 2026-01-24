import type { Graph } from "@antv/x6";
import type { Cell } from "@antv/x6/lib/model";

export const hasIncomingOnPort = (
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
