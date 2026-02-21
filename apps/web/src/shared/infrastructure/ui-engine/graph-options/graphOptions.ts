import { GraphManual } from "@antv/x6";
import { createConnectingConfig } from "./connecting";
import type { UIEngineContext } from "../model/types";
import { GRID_SIZE } from "../model";
import { usePortStateMap } from "../presets-registry/usePortStateMap";

export const makeGraphOptions = (
    container: HTMLDivElement,
    _ctx?: UIEngineContext,
): Partial<GraphManual> => ({
    container,
    async: false,
    grid: {
        args: { thickness: 2, color: "#A4B7D2" },
        size: GRID_SIZE,
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

    onPortRendered({ node, contentContainer, port, contentSelectors }) {
        const circle = contentSelectors?.circle as Element;
        if (!circle) return;
        usePortStateMap().save(node, port.id, { port: circle });

        contentContainer.addEventListener("mousedown", () => node.toFront());
    },
});
