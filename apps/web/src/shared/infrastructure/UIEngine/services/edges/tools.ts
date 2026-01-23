import type { Edge, Graph } from "@antv/x6";

const EDGE_TOOLS = [
    {
        name: "vertices" as const,
        args: { snapRadius: 8 },
    },
];

export const toggleEdgeEditTools = (edge: Edge, enabled: boolean) => {
    if (enabled) {
        edge.addTools(EDGE_TOOLS);
        return;
    }
    if (edge.hasTools()) edge.removeTools();
};

export const bindEdgeEditTools = (graph: Graph) => {
    let activeEdge: Edge | null = null;

    const enableActive = () => {
        if (activeEdge) toggleEdgeEditTools(activeEdge, true);
    };

    const disableActive = () => {
        if (activeEdge) toggleEdgeEditTools(activeEdge, false);
    };

    graph.on("edge:click", ({ edge }) => {
        if (activeEdge && activeEdge.id !== edge.id) {
            toggleEdgeEditTools(activeEdge, false);
        }
        activeEdge = edge;
        enableActive();
    });

    graph.on("edge:selected", ({ edge }) => {
        if (activeEdge && activeEdge.id !== edge.id) {
            toggleEdgeEditTools(activeEdge, false);
        }
        activeEdge = edge;
        enableActive();
    });

    graph.on("edge:unselected", ({ edge }) => {
        if (activeEdge?.id === edge.id) {
            disableActive();
            activeEdge = null;
        }
    });

    graph.on("blank:click", () => {
        disableActive();
        activeEdge = null;
    });

    graph.on("model:reseted", () => {
        disableActive();
        activeEdge = null;
    });

    graph.on("edge:removed", ({ edge }) => {
        if (activeEdge?.id === edge.id) {
            activeEdge = null;
        }
    });
};
