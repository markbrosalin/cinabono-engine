import { Metadata } from "@antv/x6/lib/model/port";
import { MarkupJSONMarkup } from "@antv/x6/lib/view/markup";
import {
    NODE_INSET,
    NODE_PORT_LAYOUTS,
    STROKE_WIDTH,
} from "@gately/shared/infrastructure/ui-engine/model/constants";
import { BaseLogicSpec } from ".";

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
        bottom: {
            position: { name: NODE_PORT_LAYOUTS.bottom },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-input",
                },
            },
        },
    },
};

export const createBaseNodeAttrs = (spec: BaseLogicSpec) => {
    return {
        body: {
            x: NODE_INSET,
            y: NODE_INSET,
            width: spec.minWidth,
            height: spec.minHeight,
            strokeWidth: STROKE_WIDTH,
        },
        icon: {
            d: spec.iconPath,
            ref: "body",
            refX: "50%",
            refY: "50%",
        },
    };
};
