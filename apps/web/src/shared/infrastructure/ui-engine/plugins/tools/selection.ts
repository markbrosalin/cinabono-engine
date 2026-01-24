import { Selection } from "@antv/x6";
import type { UIEnginePlugin } from "../../model/types";

export const selectionPlugin: UIEnginePlugin = {
    name: "tools:selection",
    apply(graph) {
        const selection = new Selection({
            graph,
            rubberband: false,
            multiple: false,
            showNodeSelectionBox: false,
            showEdgeSelectionBox: false,
            pointerEvents: "none",
            movingRouterFallback: "orth",
        });
        graph.use(selection);

        return () => {
            // Selection implements dispose via View -> has remove?
            selection.clean?.();
            selection.dispose?.();
        };
    },
};
