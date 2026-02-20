import { Edge } from "@antv/x6";
import { getValueClass, setValueClass } from "../lib/logic-values";
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
        lastValue: getValueClass(path),
    });
};

export const getCachedEdgeState = (edge: Edge): EdgeState | undefined => {
    return edgeCacheMap.get(edge);
};

export const updateCachedEdgeClass = (edge: Edge, valueClass: LogicValueClass) => {
    const edgeState = getCachedEdgeState(edge);
    if (!edgeState) return;

    if (edgeState.lastValue === valueClass) return;

    setValueClass(edgeState.path, valueClass);

    for (const vertex of edgeState.vertices) {
        vertex.setAttribute("class", setValueClass(vertex, valueClass));
    }

    edgeState.lastValue = valueClass;
};
