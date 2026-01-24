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
        virtual: { enabled: true, margin: 400 },
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
        connecting: createConnectingConfig("metro"),
        preventDefaultBlankAction: true,
        preventDefaultContextMenu: true,
        preventDefaultDblClick: true,
        preventDefaultMouseDown: true,

        onPortRendered({ node, contentContainer }) {
            contentContainer.addEventListener("mousedown", () => {
                node.toFront();
            });
        },
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

    graph.on("node:mousedown", ({ cell }) => {
        cell.toFront();
    });

    graph.on("node:selected", ({ cell }) => {
        cell.toFront();
    });

    bindEdgeSignals(graph);
    bindEdgeEditTools(graph);

    return graph;
};
