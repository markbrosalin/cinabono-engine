import { Graph } from "@antv/x6";
import { PortSide } from "../model/types";
import { XYOffset } from "@gately/shared/types";
import { NODE_PORT_LAYOUTS } from "../model/constants";

let registered = false;

const buildSideLayout = (side: PortSide) => {
    return (
        portsPositionArgs: Partial<XYOffset>[],
        elemBBox: { x: number; y: number; width: number; height: number },
        groupPositionArgs: Partial<XYOffset> = {},
    ) => {
        const gap = 16;
        const paddingTop = 17;
        const baseX = side === "left" ? elemBBox.x : elemBBox.x + elemBBox.width;
        const startY = elemBBox.y + paddingTop;

        return portsPositionArgs.map((args, index) => {
            const dx = (groupPositionArgs.dx ?? 0) + (args.dx ?? 0);
            const dy = (groupPositionArgs.dy ?? 0) + (args.dy ?? 0);
            const x = Math.round(baseX + dx);
            const y = Math.round(startY + index * gap + dy);
            return { position: { x, y }, angle: 0, ...args };
        });
    };
};

export const registerNodePortLayouts = () => {
    if (registered) return;

    Graph.registerPortLayout(NODE_PORT_LAYOUTS.left, buildSideLayout("left"), true);
    Graph.registerPortLayout(NODE_PORT_LAYOUTS.right, buildSideLayout("right"), true);

    registered = true;
};
