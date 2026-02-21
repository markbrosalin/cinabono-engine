import type { Graph, Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import { logicValueToClass, pinRefToPortId } from "../../lib";
import type { LogicValueClass, PinRef, UIEngineContext } from "../../model/types";
import { usePortStateMap } from "../../presets-registry/usePortStateMap";

export type PortService = ReturnType<typeof usePortService>;

export const usePortService = (graph: Graph, _ctx: UIEngineContext) => {
    const portMap = usePortStateMap();

    const _resolveNode = (nodeId: string): Node | undefined => {
        const cell = graph.getCellById(nodeId);
        if (!cell || !cell.isNode?.()) return;
        return cell as Node;
    };

    const _setPortValueClass = (
        nodeId: string,
        portId: string,
        valueClass: LogicValueClass,
    ): void => {
        const node = _resolveNode(nodeId);
        if (!node) return;

        const port = portMap.get(node, portId);
        if (!port) return;

        portMap.updateValue(node, portId, valueClass);
    };

    const setPortValue = (elementId: string, pinRef: PinRef, value: LogicValue): void => {
        const portId = pinRefToPortId(pinRef);
        const valueClass = logicValueToClass(value);
        _setPortValueClass(elementId, portId, valueClass);
    };

    return {
        setPortValue,
    };
};
