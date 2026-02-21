import type { Edge } from "@antv/x6";
import type { ItemLink } from "@cnbn/schema";
import { decodePortId } from "../ports";
import { EdgeData } from "../../model";

export const getEdgeData = <T extends object = Record<string, unknown>>(edge: Edge): T =>
    (edge.getData() ?? {}) as T;

// export const setEdgeData = <T extends object>(edge: Edge, patch: Partial<T>): void => {
//     const data = getEdgeData<T>(edge);
//     edge.setData({ ...data, ...patch });
// };

// export const withLinkId = (edge: Edge, linkId: string): void => {
//     setEdgeData<{ linkId?: string }>(edge, { linkId });
// };

export const resolveEdgeEndpoints = (edge: Edge): EdgeData | null => {
    const sourceCell = edge.getSourceCell();
    const targetCell = edge.getTargetCell();
    const sourcePort = edge.getSourcePortId();
    const targetPort = edge.getTargetPortId();

    if (!sourceCell || !targetCell || !sourcePort || !targetPort) return null;
    if (!sourceCell.isNode?.() || !targetCell.isNode?.()) return null;

    const source = decodePortId(sourcePort);
    const target = decodePortId(targetPort);

    if (source.side === "right" && target.side === "left") {
        return {
            from: {
                node: sourceCell,
                pin: source.id,
                portId: sourcePort,
            },
            to: {
                node: targetCell,
                pin: target.id,
                portId: targetPort,
            },
        };
    }

    if (source.side === "left" && target.side === "right") {
        return {
            to: {
                node: sourceCell,
                pin: source.id,
                portId: sourcePort,
            },
            from: {
                node: targetCell,
                pin: target.id,
                portId: targetPort,
            },
        };
    }

    return null;
};

export const buildLinkFromEndpoints = (endpoints: EdgeData): ItemLink => ({
    fromItemId: endpoints.from.node.id,
    fromPin: endpoints.from.pin,
    toItemId: endpoints.to.node.id,
    toPin: endpoints.to.pin,
});

export const buildLinkFromEdge = (edge: Edge): ItemLink | null => {
    const endpoints = resolveEdgeEndpoints(edge);
    if (!endpoints) return null;
    return buildLinkFromEndpoints(endpoints);
};
