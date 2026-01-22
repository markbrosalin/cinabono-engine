import type { Accessor } from "solid-js";
import type { Graph, Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import {
    decodePortId,
    pinRefToPortId,
    resolveSignalClass,
    stripSignalClasses,
} from "../../adapters/ports";
import type { PinUpdate, PortSignalUpdate, PortValueUpdate } from "../../types";

export type PortService = ReturnType<typeof usePortService>;

export const usePortService = (graph: Accessor<Graph | undefined>) => {
    const resolveNode = (g: Graph, nodeId: string): Node | undefined => {
        const cell = g.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    const resolvePortClass = (
        node: Node,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ): string => {
        const current = node.getPortProp<string>(portId, "attrs/circle/class");
        const base = stripSignalClasses(current);
        if (base) return `${base} ${signalClass}`.trim();

        const { side } = decodePortId(portId);
        const fallbackBase = side === "left" ? "port port-input" : "port port-output";
        return `${fallbackBase} ${signalClass}`;
    };

    const setPortSignal = (nodeId: string, portId: string, signalClass: PortSignalUpdate["signalClass"]): void => {
        const g = graph();
        if (!g) return;
        const node = resolveNode(g, nodeId);
        if (!node) return;
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));
    };

    const setPortValue = (nodeId: string, portId: string, value: LogicValue): void => {
        setPortSignal(nodeId, portId, resolveSignalClass(value));
    };

    const setPortSignalBatch = (updates: PortSignalUpdate[]): void => {
        const g = graph();
        if (!g) return;

        g.batchUpdate(() => {
            for (const update of updates) {
                const node = resolveNode(g, update.nodeId);
                if (!node) continue;
                const className = resolvePortClass(node, update.portId, update.signalClass);
                node.setPortProp(update.portId, "attrs/circle/class", className);
            }
        });
    };

    const setPortValueBatch = (updates: PortValueUpdate[]): void => {
        const mapped = updates.map((update) => ({
            ...update,
            signalClass: resolveSignalClass(update.value),
        }));
        setPortSignalBatch(mapped);
    };

    const applyPinUpdates = (updates: PinUpdate[]): void => {
        const mapped = updates.map((update) => ({
            nodeId: update.elementId,
            portId: pinRefToPortId(update.pinRef),
            value: update.value,
        }));
        setPortValueBatch(mapped);
    };

    return {
        setPortSignal,
        setPortValue,
        setPortSignalBatch,
        setPortValueBatch,
        applyPinUpdates,
    };
};
