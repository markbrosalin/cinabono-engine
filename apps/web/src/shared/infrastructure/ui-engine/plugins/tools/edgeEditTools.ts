/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Edge } from "@antv/x6";
import type { UIEnginePlugin } from "../../model/types";
import { pickLogicValueClass } from "../../lib/logic-values";

const VERTICES_TOOL = "vertices" as const;

const findPathFromEvent = (
    e: Event | undefined,
    view?: { container?: Element },
): Element | null => {
    const target = (e as MouseEvent | undefined)?.target as Element | null;
    if (!target) return null;
    const path = target.tagName?.toLowerCase() === "path" ? target : target.closest("path");
    if (!path) return null;
    if (view?.container && !view.container.contains(path)) return null;
    return path;
};

export const edgeEditToolsPlugin: UIEnginePlugin = {
    name: "tools:edgeEdit",
    apply(graph, _ctx) {
        let activeEdge: Edge | null = null;

        const removeVerticesTools = (edge: Edge) => {
            if (typeof edge.removeTool === "function") {
                edge.removeTool(VERTICES_TOOL);
            } else if (typeof edge.removeTools === "function") {
                edge.removeTools();
            }
        };

        const toggle = (edge: Edge, enabled: boolean) => {
            if (enabled) {
                const value = pickLogicValueClass(edge.getAttrByPath("line/class"));
                removeVerticesTools(edge);
                edge.addTools({ name: VERTICES_TOOL, args: { className: value } });
            } else {
                removeVerticesTools(edge);
            }
        };

        const onEdgeAttrsChanged = ({ edge }: any) => {
            if (!activeEdge) return;
            if (activeEdge?.id !== edge.id) return;
            if (!graph.isSelected(edge)) return;
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

        const onEdgeClick = ({ edge, e, view }: any) => {
            const pathTarget = findPathFromEvent(e, view);
            if (!pathTarget) return;
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

        const onCellClick = ({ cell }: any) => {
            if (cell?.isEdge?.()) return;
            clearActive();
        };

        const onSelectionChanged = () => {
            if (activeEdge && !graph.isSelected(activeEdge)) {
                clearActive();
            }
        };

        const onDocumentPointerDown = (evt: PointerEvent) => {
            if (!activeEdge) return;
            const view = graph.findViewByCell(activeEdge) as any;
            const container = view?.container as Element | undefined;
            const inside = container?.contains(evt.target as Node) ?? false;
            if (!inside) {
                hideTools();
                activeEdge = null;
            }
        };

        graph.on("edge:change:attrs", onEdgeAttrsChanged);
        graph.on("edge:click", onEdgeClick);
        graph.on("edge:unselected", onEdgeUnselected);
        graph.on("blank:click", onBlankClick);
        graph.on("edge:removed", onEdgeRemoved);
        graph.on("cell:click", onCellClick);
        graph.on("selection:changed", onSelectionChanged);
        document.addEventListener("pointerdown", onDocumentPointerDown, true);

        return () => {
            clearActive();
            graph.off("edge:change:attrs", onEdgeAttrsChanged);
            graph.off("edge:click", onEdgeClick);
            graph.off("edge:unselected", onEdgeUnselected);
            graph.off("blank:click", onBlankClick);
            graph.off("edge:removed", onEdgeRemoved);
            graph.off("cell:click", onCellClick);
            graph.off("selection:changed", onSelectionChanged);
            document.removeEventListener("pointerdown", onDocumentPointerDown, true);
        };
    },
};
