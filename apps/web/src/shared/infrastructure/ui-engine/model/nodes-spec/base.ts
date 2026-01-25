import { Metadata } from "@antv/x6/lib/model/port";
import { MarkupJSONMarkup } from "@antv/x6/lib/view/markup";
import { NODE_PORT_LAYOUTS } from "@gately/shared/infrastructure/ui-engine/model/constants";

export const baseNodeMarkup: MarkupJSONMarkup[] = [
    {
        tagName: "g",
        className: "base-node",
        children: [
            { tagName: "rect", selector: "body" },
            { tagName: "path", selector: "icon" },
        ],
    },
];

export const baseNodePorts: Metadata = {
    items: [],
    groups: {
        left: {
            position: { name: NODE_PORT_LAYOUTS.left },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-input",
                },
            },
        },
        right: {
            position: { name: NODE_PORT_LAYOUTS.right },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-output",
                },
            },
        },
    },
};

export const createBaseNodeAttrs = (iconPath: string) => ({
    body: {},
    icon: {
        d: iconPath,
        refX: "50%",
        refY: "50%",
    },
});
