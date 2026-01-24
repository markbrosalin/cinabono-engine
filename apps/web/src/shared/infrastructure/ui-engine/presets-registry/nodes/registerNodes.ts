import { BaseLogicSpec } from "@gately/shared/infrastructure";
import { baseNodeMarkup, baseNodePorts, createBaseNodeAttrs, LOGIC_NODE_SPECS } from "./spec";
import { Graph } from "@antv/x6/lib/graph";

const registerNode = (spec: BaseLogicSpec) => {
    Graph.registerNode(
        spec.nodeName,
        {
            inherit: "rect",
            width: spec.minWidth,
            height: spec.minHeight,
            markup: baseNodeMarkup,
            attrs: createBaseNodeAttrs(spec.iconPath),
            ports: baseNodePorts,
        },
        true,
    );
};

export const registerNodes = () => {
    LOGIC_NODE_SPECS.forEach(registerNode);
};
