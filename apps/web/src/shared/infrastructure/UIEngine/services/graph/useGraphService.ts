import type { Accessor } from "solid-js";
import type { Graph, Node } from "@antv/x6";
import type { UIEngineNodeProps } from "../../types";

export type GraphService = ReturnType<typeof useGraphService>;

export const useGraphService = (graph: Accessor<Graph | undefined>) => {
    const addNode = (config: UIEngineNodeProps): Node | undefined => {
        const g = graph();
        if (!g) return;
        return g.addNode(config);
    };

    const getNodeById = (nodeId: string): Node | undefined => {
        const g = graph();
        if (!g) return;
        const cell = g.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    return { addNode, getNodeById };
};
