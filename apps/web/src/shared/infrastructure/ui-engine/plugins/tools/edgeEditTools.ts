/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Edge } from "@antv/x6";
import type { UIEnginePlugin } from "../../model/types";
import { pickLogicValueClass } from "../../lib/logic-values";

const EDGE_TOOLS = [{ name: "vertices" as const }];

export const edgeEditToolsPlugin: UIEnginePlugin = {
    name: "tools:edgeEdit",
    apply(graph, _ctx) {
        let activeEdge: Edge | null = null;

        const toggle = (edge: Edge, enabled: boolean) => {
            if (enabled) {
                const value = pickLogicValueClass(edge.getAttrByPath("line/class"));

                EDGE_TOOLS.forEach((t) => {
                    if (!edge.hasTool(t.name))
                        edge.addTools({ name: t.name, args: { className: value } });
                });
                return;
            }
            if (edge.hasTools()) edge.removeTools();
        };

        const onEdgeAttrsChanged = ({ edge }: any) => {
            if (activeEdge?.id !== edge.id) return;
            toggle(edge, true);
        };

        const showTools = () => {
            if (activeEdge) toggle(activeEdge, true);
        };

        const clearActive = () => {
            hideTools();
            activeEdge = null;
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

        graph.on("edge:change:attrs", onEdgeAttrsChanged);
        graph.on("edge:click", onEdgeClick);
        graph.on("edge:unselected", onEdgeUnselected);
        graph.on("blank:click", onBlankClick);
        graph.on("edge:removed", onEdgeRemoved);

        return () => {
            clearActive();
            graph.off("edge:change:attrs", onEdgeAttrsChanged);
            graph.off("edge:click", onEdgeClick);
            graph.off("edge:unselected", onEdgeUnselected);
            graph.off("blank:click", onBlankClick);
            graph.off("edge:removed", onEdgeRemoved);
        };
    },
};
