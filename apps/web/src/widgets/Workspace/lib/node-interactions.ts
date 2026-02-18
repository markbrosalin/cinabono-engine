import type { Node } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import type { LogicValue } from "@cnbn/schema";
import {
    applyInteractiveNodeVisual,
    decodePortId,
    logicValueToClass,
} from "@gately/shared/infrastructure/ui-engine/lib";
import { removeLogicValueClass } from "@gately/shared/infrastructure/ui-engine/lib/logic-values";
import type { WorkspaceUIEngine } from "./types";

type BinaryValue = "0" | "1";

type ToggleRuntime = {
    toggleValue?: LogicValue;
    togglePin?: string;
};

type NodeData = {
    hash?: string;
    __ui?: ToggleRuntime;
};

type NodeClickContext = {
    node: Node;
    tabId: string;
    uiEngine: WorkspaceUIEngine;
    logicEngine: CinabonoClient;
    runCommand: <T>(command: () => Promise<T>) => Promise<T>;
};

type NodeClickHandler = (ctx: NodeClickContext) => Promise<void>;

const isBinaryValue = (value: unknown): value is BinaryValue => value === "0" || value === "1";

const toggleBinaryValue = (value: BinaryValue): BinaryValue => (value === "1" ? "0" : "1");

const getPrimaryOutputPin = (node: Node): string | null => {
    const ports = node.getPorts?.() ?? [];

    for (const port of ports) {
        if (!port?.id || typeof port.id !== "string") continue;
        const { side, id } = decodePortId(port.id);
        if (side !== "right") continue;
        return id;
    }

    return null;
};

const getOutputPortIdByPin = (node: Node, pin: string): string | null => {
    const ports = node.getPorts?.() ?? [];
    for (const port of ports) {
        if (!port?.id || typeof port.id !== "string") continue;
        const decoded = decodePortId(port.id);
        if (decoded.side === "right" && decoded.id === pin) return port.id;
    }
    return null;
};

const getToggleRuntime = (node: Node): ToggleRuntime => {
    const data = (node.getData?.() ?? {}) as NodeData;
    return data.__ui ?? {};
};

const setToggleRuntime = (node: Node, patch: ToggleRuntime) => {
    const data = (node.getData?.() ?? {}) as NodeData;
    const nextUI = { ...(data.__ui ?? {}), ...patch };
    node.setData({ ...data, __ui: nextUI });
};

const applyToggleVisualFallback = (node: Node, pin: string, value: BinaryValue) => {
    applyInteractiveNodeVisual(node, "TOGGLE", value);

    const portId = getOutputPortIdByPin(node, pin);
    if (!portId) return;

    const current = node.getPortProp<string>(portId, "attrs/circle/class") ?? "";
    const base = removeLogicValueClass(current);
    const signalClass = logicValueToClass(value);
    node.setPortProp(portId, "attrs/circle/class", `${base} ${signalClass}`.trim());
};

const applyOptimisticOutput = (
    uiEngine: WorkspaceUIEngine,
    node: Node,
    pin: string,
    value: BinaryValue,
) => {
    const applyPinUpdates = uiEngine.services()?.ports?.applyPinUpdates;
    if (applyPinUpdates) {
        applyPinUpdates([
            {
                elementId: node.id,
                pinRef: {
                    side: "output",
                    index: pin,
                },
                value,
            },
        ]);
        return;
    }

    applyToggleVisualFallback(node, pin, value);
};

const runTogglePrimaryClick: NodeClickHandler = async (ctx) => {
    const pin = getPrimaryOutputPin(ctx.node);
    if (!pin) return;

    const runtime = getToggleRuntime(ctx.node);
    const previousValue: BinaryValue = isBinaryValue(runtime.toggleValue) ? runtime.toggleValue : "0";
    const nextValue = toggleBinaryValue(previousValue);

    setToggleRuntime(ctx.node, {
        togglePin: pin,
        toggleValue: nextValue,
    });
    applyOptimisticOutput(ctx.uiEngine, ctx.node, pin, nextValue);

    try {
        await ctx.runCommand(() =>
            ctx.logicEngine.call("/item/updateOutput", {
                tabId: ctx.tabId,
                itemId: ctx.node.id,
                pin,
                value: nextValue,
            }),
        );
    } catch (err) {
        setToggleRuntime(ctx.node, {
            togglePin: pin,
            toggleValue: previousValue,
        });
        applyOptimisticOutput(ctx.uiEngine, ctx.node, pin, previousValue);
        console.error("[workspace-bridge] toggle failed", err);
    }
};

const PRIMARY_CLICK_HANDLERS: Record<string, NodeClickHandler> = {
    TOGGLE: runTogglePrimaryClick,
};

export const resolvePrimaryNodeClickHandler = (node: Node): NodeClickHandler | undefined => {
    const data = (node.getData?.() ?? {}) as NodeData;
    if (!data.hash) return;
    return PRIMARY_CLICK_HANDLERS[data.hash];
};
