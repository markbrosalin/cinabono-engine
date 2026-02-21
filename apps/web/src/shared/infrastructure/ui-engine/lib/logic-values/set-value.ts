import { Edge, Node } from "@antv/x6";
import { LogicValueClass } from "@gately/shared/lib/logic-values";
import { removeLogicValueClass } from "./remove-value";

export const setValueClassToEdge = ({
    edge,
    path,
    valueClass,
}: {
    edge: Edge;
    path?: Element;
    valueClass: LogicValueClass;
}) => {
    const current = edge.getAttrByPath?.("line/class") as string;
    const base = removeLogicValueClass(current);
    const merged = `${base} ${valueClass}`.trim();
    edge.setAttrByPath("line/class", merged, { silent: true });
    path?.setAttribute("class", merged);
};

export const setValueClassToPort = ({
    node,
    portId,
    path,
    valueClass,
}: {
    node: Node;
    portId: string;
    path?: Element;
    valueClass: LogicValueClass;
}) => {
    const current = node.getPortProp(portId, "attrs/circle/class") as string;

    const base = removeLogicValueClass(current);
    const merged = `${base} ${valueClass}`.trim();

    node.setPortProp(portId, "attrs/circle/class", merged, { silent: true });
    path?.setAttribute("class", merged);
};
