import { Graph } from "@antv/x6";
import { Metadata } from "@antv/x6/lib/model/port";
import { MarkupJSONMarkup } from "@antv/x6/lib/view/markup";
import { LOGIC_NODE_SPECS, type BaseLogicSpec } from "../element-specs";
import { LOGIC_PORT_LAYOUTS } from "./logicPortLayouts";

const baseLogicMarkup: MarkupJSONMarkup[] = [
    {
        tagName: "g",
        className: "base-logic",
        children: [
            { tagName: "rect", selector: "body" },
            { tagName: "path", selector: "icon" },
        ],
    },
];

const createBaseLogicAttrs = (iconPath: string) => ({
    body: {},
    icon: {
        d: iconPath,
        refX: "50%",
        refY: "50%",
    },
});

const baseLogicPorts: Metadata = {
    items: [],
    groups: {
        left: {
            position: { name: LOGIC_PORT_LAYOUTS.left },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-input",
                },
            },
        },
        right: {
            position: { name: LOGIC_PORT_LAYOUTS.right },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-output",
                },
            },
        },
    },
};

const registerBaseLogicNode = (spec: BaseLogicSpec) => {
    Graph.registerNode(
        spec.nodeName,
        {
            inherit: "rect",
            width: spec.minWidth,
            height: spec.minHeight,
            markup: baseLogicMarkup,
            attrs: createBaseLogicAttrs(spec.iconPath),
            ports: baseLogicPorts,
        },
        true,
    );
};

export const registerBaseLogicNodes = () => {
    LOGIC_NODE_SPECS.forEach(registerBaseLogicNode);
};
