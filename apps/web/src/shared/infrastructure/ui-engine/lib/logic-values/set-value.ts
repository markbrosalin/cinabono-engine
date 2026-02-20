import { Edge, EdgeProperties } from "@antv/x6";
import { pickLogicValueClass, removeLogicValueClass } from ".";
import { LogicValueClass } from "@gately/shared/lib/logic-values";

export function applyEdgeValueClassFromMagnet(
    edge: Edge<EdgeProperties> | null | undefined,
    magnet: Element | null | undefined,
) {
    if (!edge || !magnet) return;
    const valueClass = pickLogicValueClass(magnet.classList.value);
    if (!valueClass) return;

    const current = (edge.getAttrByPath?.("line/class") ?? "") as string;
    const base = removeLogicValueClass(current) || "connection";
    edge.setAttrByPath?.("line/class", `${base} ${valueClass}`.trim());
}

export const setValueClass = (el: Element, valueClass: LogicValueClass): string => {
    const className = el.getAttribute("class") ?? "";
    const merged = `${removeLogicValueClass(className)} ${valueClass}`.trim();
    el.setAttribute("class", merged);
    return merged;
};
