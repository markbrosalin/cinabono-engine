import { Graph } from "@antv/x6";
import { registerDefaultNodes } from "./Nodes";

export const registerGraph = (container: HTMLDivElement) => {
    registerDefaultNodes();
    return new Graph({
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
        preventDefaultBlankAction: true,
        preventDefaultContextMenu: true,
        preventDefaultDblClick: true,
        preventDefaultMouseDown: true,
    });
};
