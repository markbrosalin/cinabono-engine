import type { Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";
import {
    buildInteractiveNodeAttrs,
    type InteractiveNodeAttrs,
} from "../../model/nodes-spec";

export { buildInteractiveNodeAttrs };

const applyInteractiveAttrs = (node: Node, attrs: InteractiveNodeAttrs) => {
    for (const [selector, selectorAttrs] of Object.entries(attrs)) {
        for (const [attrName, attrValue] of Object.entries(selectorAttrs)) {
            node.setAttrByPath(`${selector}/${attrName}`, attrValue);
        }
    }
};

export const applyInteractiveNodeVisual = (
    node: Node,
    hash: string,
    value: LogicValue | undefined,
): void => {
    const attrs = buildInteractiveNodeAttrs(hash, value);
    if (!attrs) return;
    applyInteractiveAttrs(node, attrs);
};
