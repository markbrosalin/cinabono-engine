import { Graph } from "@antv/x6";

export const registerGraph = (container: HTMLDivElement) => {
    return new Graph({
        container,
        async: true,
        grid: {
            args: { thickness: 2, color: "#A4B7D2" },
            size: 16,
            type: "dot",
            visible: true,
        },
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
