import { Node } from "@antv/x6";
import { LogicValueClass } from "../model";
import { getValueClassFromElement } from "../lib/logic-values";
import { setValueClassToPort } from "../lib/logic-values/set-value";

const portCacheMap = new WeakMap<Node, Map<string, PortDomState>>();

type PortDomState = {
    circle: Element;
    lastValue: LogicValueClass;
};

export const usePortStateMap = () => {
    const save = (node: Node, portId: string, el: Element) => {
        let nodeMap = portCacheMap.get(node);
        if (!nodeMap) {
            nodeMap = new Map();
            portCacheMap.set(node, nodeMap);
        }
        nodeMap.set(portId, { circle: el, lastValue: getValueClassFromElement(el) });
    };

    const get = (node: Node, portId: string): PortDomState | undefined => {
        return portCacheMap.get(node)?.get(portId);
    };

    const removePort = (node: Node, portId: string) => {
        const nodeMap = portCacheMap.get(node);
        if (nodeMap) {
            nodeMap.delete(portId);
        }
    };

    const removeNode = (node: Node) => {
        portCacheMap.delete(node);
    };

    const updateValue = (node: Node, portId: string, valueClass: LogicValueClass) => {
        const state = get(node, portId);
        if (!state) return;

        if (state.lastValue === valueClass) return;

        setValueClassToPort({ node, portId, valueClass, path: state.circle });

        state.lastValue = valueClass;
    };

    return {
        save,
        get,
        updateValue,
        removePort,
        removeNode,
    };
};
