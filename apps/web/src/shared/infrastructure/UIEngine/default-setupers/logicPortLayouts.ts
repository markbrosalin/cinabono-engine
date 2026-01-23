import { Graph } from "@antv/x6";

export const LOGIC_PORT_LAYOUTS = {
    left: "logic-left",
    right: "logic-right",
} as const;

type PortLayoutArgs = {
    dx?: number;
    dy?: number;
};

type GroupLayoutArgs = {
    dx?: number;
    dy?: number;
};

let registered = false;

const buildSideLayout = (side: "left" | "right") => {
    return (
        portsPositionArgs: PortLayoutArgs[],
        elemBBox: { x: number; y: number; width: number; height: number },
        groupPositionArgs: GroupLayoutArgs = {},
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

export const registerLogicPortLayouts = () => {
    if (registered) return;

    Graph.registerPortLayout(LOGIC_PORT_LAYOUTS.left, buildSideLayout("left"), true);
    Graph.registerPortLayout(LOGIC_PORT_LAYOUTS.right, buildSideLayout("right"), true);
    registered = true;
};
