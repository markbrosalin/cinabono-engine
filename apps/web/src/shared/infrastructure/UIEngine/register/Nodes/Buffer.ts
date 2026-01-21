import { Graph } from "@antv/x6";
import { Metadata } from "@antv/x6/lib/model/port";
import { MarkupJSONMarkup } from "@antv/x6/lib/view/markup";

export const BUFFER_NODE_NAME = "buffer" as const;

const bufferMarkup: MarkupJSONMarkup[] = [
    {
        tagName: "g",
        className: "base-logic",
        children: [
            { tagName: "rect", selector: "body" },
            { tagName: "path", selector: "icon" },
        ],
    },
];

const bufferAttrs = {
    body: {},
    icon: {
        d: `M-16 0 L-8 0 M9 0 L17 0
            M8.598 -0.805
            C9.245 -0.416 9.245 0.523 8.598 0.911
            L-6.485 9.961
            C-7.152 10.361 -8 9.881 -8 9.104
            L-8 -8.997
            C-8 -9.774 -7.152 -10.254 -6.485 -9.854
            L8.598 -0.805 Z`,
        refX: "50%",
        refY: "50%",
    },
};

const ports: Metadata = {
    items: [
        { id: "input", group: "left" },
        { id: "output", group: "right" },
    ],
    groups: {
        left: {
            position: { name: "left" },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-input signal-hiz",
                },
            },
        },
        right: {
            position: { name: "right" },
            attrs: {
                circle: {
                    magnet: true,
                    class: "port port-output signal-x",
                },
            },
        },
    },
};

export const registerBufferNode = () => {
    Graph.registerNode(
        BUFFER_NODE_NAME,
        {
            inherit: "rect",
            width: 66,
            height: 34,
            markup: bufferMarkup,
            attrs: bufferAttrs,
            ports,
        },
        true,
    );
};
