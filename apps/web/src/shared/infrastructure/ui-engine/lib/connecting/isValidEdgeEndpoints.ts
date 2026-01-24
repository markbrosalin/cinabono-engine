import { Graph, ValidateConnectionArgs } from "@antv/x6";
import { normalizeConnection } from "./normalizeConnection";
import { hasIncomingOnPort } from "./hasIncomingOnPort";

type ConnectionEndpoints = Pick<
    ValidateConnectionArgs,
    "sourceCell" | "sourcePort" | "targetCell" | "targetPort"
> & { edgeId?: string };

export const isValidConnectionEndpoints = (
    graph: Graph,
    endpoints: ConnectionEndpoints,
): boolean => {
    const normalized = normalizeConnection(endpoints);
    if (!normalized) return false;

    return hasIncomingOnPort(graph, normalized.inputCell, normalized.inputPort, endpoints.edgeId)
        ? false
        : true;
};
