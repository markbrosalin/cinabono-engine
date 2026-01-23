import { Graph, Selection } from "@antv/x6";
import { bindEdgeEditTools, bindEdgeSignals } from "./services/edges";
import {
    createConnectingConfig,
    registerBaseLogicNodes,
    registerLogicPortLayouts,
} from "./default-setupers";

export const registerGraph = (container: HTMLDivElement) => {
    registerBaseLogicNodes();
    registerLogicPortLayouts();

    const graph = new Graph({
        container,
        async: true,
        grid: {
            args: { thickness: 2, color: "#A4B7D2" },
            size: 16,
            type: "dot",
            visible: true,
        },
        virtual: { enabled: true },
        autoResize: true,
        mousewheel: {
            enabled: true,
            minScale: 0.2,
            maxScale: 4,
            zoomAtMousePosition: true,
        },
        panning: {
            enabled: true,
            eventTypes: ["mouseWheelDown"],
        },
        connecting: createConnectingConfig("manhattan"),
        preventDefaultBlankAction: true,
        preventDefaultContextMenu: true,
        preventDefaultDblClick: true,
        preventDefaultMouseDown: true,
    });

    graph.use(
        new Selection({
            eventTypes: ["leftMouseDown"],
            rubberband: true,
            multiple: true,
            showNodeSelectionBox: true,
            rubberNode: true,
            multipleSelectionModifiers: ["shift"],
        }),
    );

    bindEdgeSignals(graph);
    bindEdgeEditTools(graph);

    return graph;
};
