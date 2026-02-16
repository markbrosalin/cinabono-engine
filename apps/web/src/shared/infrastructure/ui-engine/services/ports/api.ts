import type { Edge, Graph, Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import { applyInteractiveNodeVisual, decodePortId, pinRefToPortId, resolveLogicValueClass } from "../../lib";
import type {
    PinUpdate,
    UIEngineContext,
    UIEngineNodeData,
} from "../../model/types";
import { removeLogicValueClass } from "../../lib/logic-values";

export type PortService = {
    applyPinUpdate: (update: PinUpdate) => void;
    applyPinUpdates: (updates: PinUpdate[]) => void;
};

export const usePortService = (graph: Graph, _ctx: UIEngineContext) => {
    type SignalClass = ReturnType<typeof resolveLogicValueClass>;

    const resolveNode = (nodeId: string): Node | undefined => {
        const cell = graph.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    const ensureBasePortClasses = (className: string, portId: string): string => {
        const { side } = decodePortId(portId);
        const expected = side === "left" ? "port-input" : "port-output";
        const tokens = new Set(className.split(/\s+/).filter(Boolean));
        const hadBase = tokens.has("port") && tokens.has(expected);
        tokens.add("port");
        tokens.add(expected);
        const merged = Array.from(tokens).join(" ");
        if (!hadBase) {
            console.warn(`[UIEngine] port base classes restored (${expected}) for ${portId}`);
        }
        return merged;
    };

    const resolvePortClass = (
        node: Node,
        portId: string,
        signalClass: SignalClass,
    ): string => {
        const current = node.getPortProp<string>(portId, "attrs/circle/class") ?? "";
        const base = ensureBasePortClasses(removeLogicValueClass(current), portId);
        return `${base} ${signalClass}`.trim();
    };

    const isOutputPortId = (portId: string) => decodePortId(portId).side === "right";

    const applyEdgeSignalClass = (
        edge: Edge,
        signalClass: SignalClass,
    ) => {
        const current = String(edge.getAttrByPath?.("line/class") ?? "");
        const base = removeLogicValueClass(current) || "connection";
        edge.setAttrByPath?.("line/class", `${base} ${signalClass}`.trim());
        applyEdgeVerticesSignalClass(edge, signalClass);
    };

    const applyEdgeVerticesSignalClass = (
        edge: Edge,
        signalClass: SignalClass,
    ) => {
        const view = graph.findViewByCell(edge) as
            | { graph?: { view?: { decorator?: Element } } }
            | undefined;
        const decorator = view?.graph?.view?.decorator;
        if (!decorator) return;

        const toolNodes = decorator.querySelectorAll(
            `.x6-cell-tool.x6-edge-tool-vertices[data-cell-id="${edge.id}"]`,
        );
        toolNodes.forEach((tool) => {
            const className = tool.getAttribute("class") ?? "";
            const merged = `${removeLogicValueClass(className)} ${signalClass}`.trim();
            tool.setAttribute("class", merged);
        });
    };

    const applyInputPortSignal = (
        node: Node,
        portId: string,
        signalClass: SignalClass,
    ) => {
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));
    };

    const applyOutputPortSignal = (
        node: Node,
        portId: string,
        signalClass: SignalClass,
    ) => {
        node.setPortProp(portId, "attrs/circle/class", resolvePortClass(node, portId, signalClass));

        const outgoing = graph.getOutgoingEdges(node) ?? [];
        for (const edge of outgoing) {
            if (edge.getSourcePortId() !== portId) continue;
            applyEdgeSignalClass(edge, signalClass);

            const targetCell = edge.getTargetCell();
            const targetPort = edge.getTargetPortId();
            if (!targetCell || !targetCell.isNode?.() || !targetPort) continue;
            applyInputPortSignal(targetCell as Node, targetPort, signalClass);
        }
    };

    const applyPortSignal = (
        node: Node,
        portId: string,
        signalClass: SignalClass,
    ) => {
        if (isOutputPortId(portId)) {
            applyOutputPortSignal(node, portId, signalClass);
            return;
        }
        applyInputPortSignal(node, portId, signalClass);
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

    const applyPinUpdates = (updates: PinUpdate[]): void => {
        graph.batchUpdate(() => {
            for (const update of updates) {
                const node = resolveNode(update.elementId);
                if (!node) continue;
                const portId = pinRefToPortId(update.pinRef);
                applyPortSignal(node, portId, resolveLogicValueClass(update.value));
                applyNodeVisualValue(node, portId, update.value);
            }
        });
    };

    const applyPinUpdate = (update: PinUpdate): void => {
        applyPinUpdates([update]);
    };

    return {
        applyPinUpdate,
        applyPinUpdates,
    };
};
