import { Node } from "@antv/x6";
import { LogicValueClass } from "../model";
import { getValueClass, setValueClass } from "../lib/logic-values";

export const portDomCache = new WeakMap<Node, Map<string, PortDomState>>();

type PortDomState = {
    element: Element;
    lastValue: LogicValueClass;
};

export const cachePortState = (node: Node, portId: string, el: Element) => {
    let nodeMap = portDomCache.get(node);
    if (!nodeMap) {
        nodeMap = new Map();
        portDomCache.set(node, nodeMap);
    }

    nodeMap.set(portId, { element: el, lastValue: getValueClass(el) });
};

export const getCachedPortState = (node: Node, portId: string): PortDomState | undefined => {
    return portDomCache.get(node)?.get(portId);
};

export const updateCachedPortClass = (node: Node, portId: string, valueClass: LogicValueClass) => {
    const portState = getCachedPortState(node, portId);
    if (!portState) return;

    if (portState.lastValue === valueClass) return;
    console.log("Updating port", { nodeId: node.id, portId, valueClass });
    setValueClass(portState.element, valueClass);
    portState.lastValue = valueClass;
};
