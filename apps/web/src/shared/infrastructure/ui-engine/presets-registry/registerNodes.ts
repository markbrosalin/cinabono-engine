import {
    baseNodeMarkup,
    baseNodePorts,
    createBaseNodeAttrs,
    LOGIC_NODE_SPECS,
} from "../model/nodes-spec";
import { Graph } from "@antv/x6";
import { BaseLogicSpec } from "../model/nodes-spec/logic";

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
