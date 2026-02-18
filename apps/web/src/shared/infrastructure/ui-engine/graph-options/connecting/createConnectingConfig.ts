import { routerPresets, Connecting } from "@antv/x6";
import type { EdgeRouterMode } from "@gately/shared/infrastructure/ui-engine/model/types";
import {
    mkEdge,
    isPortMagnet,
    isValidConnectionEndpoints,
} from "@gately/shared/infrastructure/ui-engine/lib";
import { applyEdgeValueClassFromMagnet } from "../../lib/logic-values";

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
            perpendicular: true,
            step: 8,
            maxDirectionChange: 90,
            startDirections: ["right", "left", "top", "bottom"],
            endDirections: ["right", "left", "top", "bottom"],
            fallbackRouter: routerPresets.orth,
        },
        name: routerMode,
    },
    connector: {
        name: "jumpover",
        args: { size: 6, type: "gap", radius: 4 },
    },
    targetConnectionPoint: { name: "boundary", args: { offset: -8 } },
    connectionPoint: { name: "boundary", args: { offset: -8 } },
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
