/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Edge } from "@antv/x6";
import type { UIEnginePlugin } from "../../model/types";

const EDGE_TOOLS = [{ name: "vertices" as const }];

export const edgeEditToolsPlugin: UIEnginePlugin = {
    name: "tools:edgeEdit",
    apply(graph, _ctx) {
        let activeEdge: Edge | null = null;

        const toggle = (edge: Edge, enabled: boolean) => {
            if (enabled) {
                if (EDGE_TOOLS.some((t) => !edge.hasTool(t.name))) {
                    edge.addTools(EDGE_TOOLS);
                }
                return;
            }
            if (edge.hasTools()) edge.removeTools();
        };

        const showTools = () => {
            if (activeEdge) toggle(activeEdge, true);
        };

        const hideTools = () => {
            if (activeEdge) toggle(activeEdge, false);
        };

        const onEdgeClick = ({ edge }: any) => {
            if (activeEdge && activeEdge.id !== edge.id) {
                hideTools();
            }
            activeEdge = edge;
            if (activeEdge) showTools();
        };

        const onEdgeUnselected = ({ edge }: any) => {
            if (activeEdge && activeEdge?.id === edge.id) {
                hideTools();
                activeEdge = null;
            }
        };

        const onBlankClick = () => {
            if (activeEdge) hideTools();
            activeEdge = null;
        };

        const onEdgeRemoved = ({ edge }: any) => {
            if (activeEdge?.id === edge.id) activeEdge = null;
        };

        graph.on("edge:click", onEdgeClick);
        graph.on("edge:unselected", onEdgeUnselected);
        graph.on("blank:click", onBlankClick);
        graph.on("edge:removed", onEdgeRemoved);

        return () => {
            graph.off("edge:click", onEdgeClick);
            graph.off("edge:unselected", onEdgeUnselected);
            graph.off("blank:click", onBlankClick);
            graph.off("edge:removed", onEdgeRemoved);
        };
    },
};
