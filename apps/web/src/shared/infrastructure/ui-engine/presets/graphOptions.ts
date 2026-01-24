import { GraphManual } from "@antv/x6";
import type { UIEngineContext } from "../model/types";
import { createConnectingConfig } from "./connecting";

export const makeGraphOptions = (
    container: HTMLDivElement,
    _ctx: UIEngineContext,
): Partial<GraphManual> => ({
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
    connecting: createConnectingConfig("manhattan"),
    preventDefaultBlankAction: true,
    preventDefaultContextMenu: true,
    preventDefaultDblClick: true,
    preventDefaultMouseDown: true,
});
