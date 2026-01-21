import { Accessor } from "solid-js";
import { Graph, NodeProperties } from "@antv/x6";

export const createUIEngineApi = (graph: Accessor<Graph | undefined>) => {
    const addNode = (config: NodeProperties) => {
        const g = graph();
        if (!g) return;
        const node = g.addNode(config);
        return node;
    };

    return {
        addNode,
    };
};
