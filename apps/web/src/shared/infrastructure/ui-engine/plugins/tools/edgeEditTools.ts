import type { Edge } from "@antv/x6";
import type { UIEnginePlugin } from "../../model/types";

const EDGE_TOOLS = [{ name: "vertices" as const }];

export const edgeEditToolsPlugin: UIEnginePlugin = {
    name: "tools:edgeEditTools",
    apply(graph) {
        let activeEdge: Edge | null = null;

        const toggle = (edge: Edge, enabled: boolean) => {
            if (enabled) {
                if (!edge.hasTool("vertices")) edge.addTools(EDGE_TOOLS);
                return;
            }
            if (edge.hasTools()) edge.removeTools();
        };

        const onEdgeClick = ({ edge }: any) => {
            if (activeEdge && activeEdge.id !== edge.id) toggle(activeEdge, false);
            activeEdge = edge;
            toggle(activeEdge, true);
        };

        const onEdgeUnselected = ({ edge }: any) => {
            if (activeEdge?.id === edge.id) {
                toggle(activeEdge, false);
                activeEdge = null;
            }
        };

        const onBlankClick = () => {
            if (activeEdge) toggle(activeEdge, false);
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
