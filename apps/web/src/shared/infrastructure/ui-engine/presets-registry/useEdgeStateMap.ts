import { Edge } from "@antv/x6";
import { getValueClassFromElement } from "../lib/logic-values";
import { LogicValueClass } from "@gately/shared/lib/logic-values";
import { setValueClassToEdge } from "../lib/logic-values/set-value";

type EdgeDomState = {
    path: Element;
    lastValue: LogicValueClass;
};

const edgeCacheMap = new WeakMap<Edge, EdgeDomState>();

export const useEdgeStateMap = () => {
    const save = (edge: Edge, path: Element) => {
        edgeCacheMap.set(edge, {
            path,
            lastValue: getValueClassFromElement(path),
        });
    };

    const get = (edge: Edge): EdgeDomState | undefined => {
        return edgeCacheMap.get(edge);
    };

    const updateValue = (edge: Edge, valueClass: LogicValueClass) => {
        const state = get(edge);
        if (!state) return;
        if (state.lastValue === valueClass) return;

        setValueClassToEdge({ edge, path: state.path, valueClass });

        state.lastValue = valueClass;
    };

    const remove = (edge: Edge) => {
        edgeCacheMap.delete(edge);
    };

    return {
        save,
        get,
        updateValue,
        remove,
    };
};
