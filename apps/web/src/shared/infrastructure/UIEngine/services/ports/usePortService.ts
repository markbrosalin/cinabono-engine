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
import { applyEdgeSignalFromSource } from "../edges/signals";

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

    const isOutputPortId = (portId: string) => decodePortId(portId).side === "right";

    const applyInputPortSignal = (
        node: Node,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ) => {
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));
    };

    const applyOutputPortSignal = (
        g: Graph,
        node: Node,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ) => {
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));

        const outgoing = g.getOutgoingEdges(node) ?? [];
        for (const edge of outgoing) {
            if (edge.getSourcePortId() !== portId) continue;
            applyEdgeSignalFromSource(edge, node, portId);

            const targetCell = edge.getTargetCell();
            const targetPort = edge.getTargetPortId();
            if (!targetCell || !targetCell.isNode?.() || !targetPort) continue;
            applyInputPortSignal(targetCell as Node, targetPort, signalClass);
        }
    };

    const setPortSignal = (nodeId: string, portId: string, signalClass: PortSignalUpdate["signalClass"]): void => {
        const g = graph();
        if (!g) return;
        const node = resolveNode(g, nodeId);
        if (!node) return;
        g.batchUpdate(() => {
            if (isOutputPortId(portId)) {
                applyOutputPortSignal(g, node, portId, signalClass);
                return;
            }
            applyInputPortSignal(node, portId, signalClass);
        });
    };

    const setPortValue = (nodeId: string, portId: string, value: LogicValue): void => {
        setPortSignal(nodeId, portId, resolveSignalClass(value));
    };

    const setOutputPortValue = (nodeId: string, portId: string, value: LogicValue): void => {
        const g = graph();
        if (!g) return;
        const node = resolveNode(g, nodeId);
        if (!node) return;
        const signalClass = resolveSignalClass(value);
        g.batchUpdate(() => {
            applyOutputPortSignal(g, node, portId, signalClass);
        });
    };

    const setPortSignalBatch = (updates: PortSignalUpdate[]): void => {
        const g = graph();
        if (!g) return;

        g.batchUpdate(() => {
            for (const update of updates) {
                const node = resolveNode(g, update.nodeId);
                if (!node) continue;
                if (isOutputPortId(update.portId)) {
                    applyOutputPortSignal(g, node, update.portId, update.signalClass);
                    continue;
                }
                applyInputPortSignal(node, update.portId, update.signalClass);
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
        setOutputPortValue,
        setPortSignalBatch,
        setPortValueBatch,
        applyPinUpdates,
    };
};
