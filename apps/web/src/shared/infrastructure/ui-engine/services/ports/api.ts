import type { Graph, Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import {
    applyInteractiveNodeVisual,
    decodePortId,
    logicValueToClass,
    pinRefToPortId,
} from "../../lib";
import type {
    LogicValueClass,
    PinUpdate,
    UIEngineContext,
    UIEngineNodeData,
} from "../../model/types";
import { updateCachedPortClass, getCachedPortState } from "../../presets-registry/portMap";

export type PortService = {
    applyPinPatch: (patch: PinUpdate | PinUpdate[]) => void;
};

export const usePortService = (graph: Graph, _ctx: UIEngineContext) => {
    const resolveNode = (nodeId: string): Node | undefined => {
        const cell = graph.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    const applyPortValue = (node: Node, portId: string, valueClass: LogicValueClass) => {
        const port = getCachedPortState(node, portId);
        if (!port) return;
        updateCachedPortClass(node, portId, valueClass);
    };

    const applyNodeVisualValue = (node: Node, portId: string, value: LogicValue) => {
        const data = (node.getData?.() ?? {}) as Partial<UIEngineNodeData>;
        const hash = data.hash;
        if (!hash) return;

        const side = decodePortId(portId).side;

        if (hash === "TOGGLE" && side === "right") {
            applyInteractiveNodeVisual(node, hash, value);
            return;
        }

        if (hash === "LAMP" && side === "left") {
            applyInteractiveNodeVisual(node, hash, value);
        }
    };
    const queuedUpdates = new Map<string, PinUpdate>();
    let flushRafId: number | null = null;
    const toUpdateKey = (update: PinUpdate): string =>
        `${update.elementId}:${update.pinRef.side}:${update.pinRef.index}`;
    const flushQueuedUpdates = (): void => {
        flushRafId = null;
        if (!queuedUpdates.size) return;

        const updates = Array.from(queuedUpdates.values());
        queuedUpdates.clear();

        for (const update of updates) {
            const node = resolveNode(update.elementId);
            if (!node) continue;
            const portId = pinRefToPortId(update.pinRef);
            applyPortValue(node, portId, logicValueToClass(update.value));
            applyNodeVisualValue(node, portId, update.value);
        }
    };
    const scheduleFlush = (): void => {
        if (flushRafId != null) return;
        if (typeof requestAnimationFrame === "function") {
            flushRafId = requestAnimationFrame(flushQueuedUpdates);
            return;
        }

        flushRafId = setTimeout(flushQueuedUpdates, 0) as unknown as number;
    };

    const applyPinPatch = (patch: PinUpdate | PinUpdate[]): void => {
        const updates = Array.isArray(patch) ? patch : [patch];
        for (const update of updates) {
            queuedUpdates.set(toUpdateKey(update), update);
        }
        scheduleFlush();
    };

    return {
        applyPinPatch,
    };
};
