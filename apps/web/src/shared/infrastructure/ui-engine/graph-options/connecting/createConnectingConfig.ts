import { routerPresets, Connecting } from "@antv/x6";
import type { EdgeRouterMode } from "@gately/shared/infrastructure/ui-engine/model/types";
import {
    mkEdge,
    isPortMagnet,
    isValidConnectionEndpoints,
} from "@gately/shared/infrastructure/ui-engine/lib";
import {
    applyEdgeValueClassFromMagnet,
    pickLogicValueClass,
    removeLogicValueClass,
} from "../../lib/logic-values";

export const createConnectingConfig = (
    routerMode: EdgeRouterMode = "manhattan",
): Partial<Connecting> => ({
    allowBlank: true,
    allowNode: false,
    allowEdge: false,
    allowPort: true,
    allowLoop: true,
    router: {
        args: {
            padding: 8,
            merge: true,
            perpendicular: true,
            step: 8,
            maxLoopCount: 500,
            maxDirectionChange: 90,
            startDirections: ["right", "left"],
            endDirections: ["left", "right"],
            fallbackRouter: routerPresets.orth,
        },
        name: routerMode,
    },
    connector: {
        name: "jumpover",
        args: { size: 6, type: "gap", radius: 4 },
    },
    targetConnectionPoint: { name: "anchor", args: { offset: 0 } },
    connectionPoint: { name: "anchor", args: { offset: 0 } },
    snap: { anchor: "center", radius: 16 },
    highlight: true,

    createEdge() {
        return mkEdge();
    },

    validateConnection(args) {
        if (!isPortMagnet(args.sourceMagnet) || !isPortMagnet(args.targetMagnet)) return false;

        applyEdgeValueClassFromMagnet(args.edge, args.sourceMagnet);

        return isValidConnectionEndpoints(this, args);
    },

    validateEdge({ edge }) {
        const [sourceCell, targetCell] = [edge.getSourceCell(), edge.getTargetCell()];
        if (!sourceCell || !targetCell) return false;

        const [sourcePort, targetPort] = [edge.getSourcePortId(), edge.getTargetPortId()];
        if (!sourcePort || !targetPort) return false;

        return isValidConnectionEndpoints(this, {
            sourceCell,
            sourcePort,
            targetCell,
            targetPort,
            edgeId: edge.id,
        });
    },
});
