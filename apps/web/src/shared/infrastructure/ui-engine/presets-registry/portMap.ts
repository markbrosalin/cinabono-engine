import { Node } from "@antv/x6";
import { LogicValueClass } from "../model";
import { getValueClassFromElement, removeLogicValueClass } from "../lib/logic-values";

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
    nodeMap.set(portId, { element: el, lastValue: getValueClassFromElement(el) });
};

export const getCachedPortState = (node: Node, portId: string): PortDomState | undefined => {
    return portDomCache.get(node)?.get(portId);
};

export const updateCachedPortClass = (node: Node, portId: string, valueClass: LogicValueClass) => {
    const state = getCachedPortState(node, portId);
    if (!state) return;

    if (state.lastValue === valueClass) return;

    const className = state.element.classList.value;
    const merged = `${removeLogicValueClass(className)} ${valueClass}`.trim();

    node.setPortProp(portId, "attrs/circle/class", merged, { silent: true });
    state.element.setAttribute("class", merged);

    state.lastValue = valueClass;
};
