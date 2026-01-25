import type { Graph, Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import {
    decodePortId,
    pinRefToPortId,
    resolveLogicValueClass,
    stripSignalClasses,
} from "../../lib";
import type {
    PinUpdate,
    PortSignalClassUpdate,
    PortValueUpdate,
    UIEngineContext,
} from "../../model/types";

export type PortService = ReturnType<typeof usePortService>;

export const usePortService = (graph: Graph, _ctx: UIEngineContext) => {
    type PortSignalUpdate = PortSignalClassUpdate;

    const resolveNode = (nodeId: string): Node | undefined => {
        const cell = graph.getCellById(nodeId);
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

    const applyPortSignal = (
        node: Node,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ) => {
        if (isOutputPortId(portId)) {
            applyOutputPortSignal(node, portId, signalClass);
            return;
        }
        applyInputPortSignal(node, portId, signalClass);
    };

    const applyInputPortSignal = (
        node: Node,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ) => {
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));
    };

    const applyOutputPortSignal = (
        node: Node,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ) => {
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));

        const outgoing = graph.getOutgoingEdges(node) ?? [];
        for (const edge of outgoing) {
            if (edge.getSourcePortId() !== portId) continue;
            // applyEdgeSignalFromSource(edge, node, portId);

            const targetCell = edge.getTargetCell();
            const targetPort = edge.getTargetPortId();
            if (!targetCell || !targetCell.isNode?.() || !targetPort) continue;
            applyInputPortSignal(targetCell as Node, targetPort, signalClass);
        }
    };

    const setPortSignal = (
        nodeId: string,
        portId: string,
        signalClass: PortSignalUpdate["signalClass"],
    ): void => {
        const node = resolveNode(nodeId);
        if (!node) return;

        graph.batchUpdate(() => {
            applyPortSignal(node, portId, signalClass);
        });
    };

    const setPortValue = (nodeId: string, portId: string, value: LogicValue): void => {
        setPortSignal(nodeId, portId, resolveLogicValueClass(value));
    };

    const setOutputPortValue = (nodeId: string, portId: string, value: LogicValue): void => {
        const node = resolveNode(nodeId);
        if (!node) return;
        const signalClass = resolveLogicValueClass(value);
        graph.batchUpdate(() => {
            applyOutputPortSignal(node, portId, signalClass);
        });
    };

    const setPortSignalBatch = (updates: PortSignalUpdate[]): void => {
        graph.batchUpdate(() => {
            for (const update of updates) {
                const node = resolveNode(update.nodeId);
                if (!node) continue;
                applyPortSignal(node, update.portId, update.signalClass);
            }
        });
    };

    const setPortValueBatch = (updates: PortValueUpdate[]): void => {
        graph.batchUpdate(() => {
            for (const update of updates) {
                const node = resolveNode(update.nodeId);
                if (!node) continue;
                applyPortSignal(node, update.portId, resolveLogicValueClass(update.value));
            }
        });
    };

    const applyPinUpdates = (updates: PinUpdate[]): void => {
        graph.batchUpdate(() => {
            for (const update of updates) {
                const node = resolveNode(update.elementId);
                if (!node) continue;
                const portId = pinRefToPortId(update.pinRef);
                applyPortSignal(node, portId, resolveLogicValueClass(update.value));
            }
        });
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
