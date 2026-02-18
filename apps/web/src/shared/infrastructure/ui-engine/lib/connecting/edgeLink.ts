import type { Edge, Node } from "@antv/x6";
import type { ItemLink } from "@cnbn/schema";
import { decodePortId } from "../ports";

type EdgeEndpoints = {
    input: {
        node: Node;
        itemId: string;
        pin: string;
        portId: string;
    };
    output: {
        node: Node;
        itemId: string;
        pin: string;
        portId: string;
    };
};

type StoredEdgeEndpoints = {
    input: {
        itemId: string;
        pin: string;
        portId: string;
    };
    output: {
        itemId: string;
        pin: string;
        portId: string;
    };
};

export const getEdgeData = <T extends object = Record<string, unknown>>(edge: Edge): T =>
    (edge.getData() ?? {}) as T;

export const setEdgeData = <T extends object>(edge: Edge, patch: Partial<T>): void => {
    const data = getEdgeData<T>(edge);
    edge.setData({ ...data, ...patch });
};

export const withLinkId = (edge: Edge, linkId: string): void => {
    setEdgeData<{ linkId?: string }>(edge, { linkId });
};

export const resolveEdgeEndpoints = (edge: Edge): EdgeEndpoints | null => {
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
            input: {
                node: targetCell,
                itemId: targetCell.id,
                pin: target.id,
                portId: targetPort,
            },
            output: {
                node: sourceCell,
                itemId: sourceCell.id,
                pin: source.id,
                portId: sourcePort,
            },
        };
    }

    if (source.side === "left" && target.side === "right") {
        return {
            input: {
                node: sourceCell,
                itemId: sourceCell.id,
                pin: source.id,
                portId: sourcePort,
            },
            output: {
                node: targetCell,
                itemId: targetCell.id,
                pin: target.id,
                portId: targetPort,
            },
        };
    }

    return null;
};

export const buildLinkFromEndpoints = (endpoints: EdgeEndpoints): ItemLink => ({
    fromItemId: endpoints.output.itemId,
    fromPin: endpoints.output.pin,
    toItemId: endpoints.input.itemId,
    toPin: endpoints.input.pin,
});

export const buildLinkFromEdge = (edge: Edge): ItemLink | null => {
    const endpoints = resolveEdgeEndpoints(edge);
    if (!endpoints) return null;
    return buildLinkFromEndpoints(endpoints);
};

export const toStoredEdgeEndpoints = (endpoints: EdgeEndpoints): StoredEdgeEndpoints => ({
    input: {
        itemId: endpoints.input.itemId,
        pin: endpoints.input.pin,
        portId: endpoints.input.portId,
    },
    output: {
        itemId: endpoints.output.itemId,
        pin: endpoints.output.pin,
        portId: endpoints.output.portId,
    },
});
