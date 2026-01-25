import { Selection } from "@antv/x6";
import type { UIEnginePlugin } from "../../model/types";

export const selectionPlugin: UIEnginePlugin = {
    name: "tools:selection",
    apply(graph, _ctx) {
        const selection = new Selection({
            eventTypes: ["leftMouseDown"],
            multipleSelectionModifiers: ["shift"],
            rubberNode: true,
            rubberband: true,
            multiple: true,
            showNodeSelectionBox: true,
            showEdgeSelectionBox: false,
            movingRouterFallback: "orth",
        });
        graph.use(selection);

        return () => {
            selection.clean?.();
            selection.dispose?.();
        };
    },
};
