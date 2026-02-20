import { Edge } from "@antv/x6";
import { getValueClassFromElement, removeLogicValueClass } from "../lib/logic-values";
import { LogicValueClass } from "@gately/shared/lib/logic-values";

type EdgeState = {
    path: Element;
    vertices: Element[];
    lastValue: LogicValueClass;
};

const edgeCacheMap = new WeakMap<Edge, EdgeState>();

export const cacheEdgeState = (edge: Edge, path: Element, decorators: Element[]) => {
    edgeCacheMap.set(edge, {
        path,
        vertices: decorators,
        lastValue: getValueClassFromElement(path),
    });
};

export const getCachedEdgeState = (edge: Edge): EdgeState | undefined => {
    return edgeCacheMap.get(edge);
};

export const updateCachedEdgeClass = (edge: Edge, valueClass: LogicValueClass) => {
    const state = getCachedEdgeState(edge);
    if (!state) return;
    if (state.lastValue === valueClass) return;

    const className = state.path.classList.value;
    const merged = `${removeLogicValueClass(className)} ${valueClass}`.trim();

    edge.setAttrByPath("line/class", merged, { silent: true });
    state.path.setAttribute("class", merged);

    // for (const vertex of state.vertices) {
    //     vertex.setAttribute("class", setNodePortValue(vertex, valueClass));
    // }

    state.lastValue = valueClass;
};
