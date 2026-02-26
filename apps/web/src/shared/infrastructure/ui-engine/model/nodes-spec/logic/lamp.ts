import { createVisualBinding, resolveSingleInputState } from "../../visual";

export const LAMP_ICON_PATH = `M 0 -8 A 6 6 0 1 1 0 4 A 6 6 0 1 1 0 -8 M -2 4 L -2 8 M 2 4 L 2 8 M -3 8 L 3 8`;

type LampVisualState = "true" | "false" | "x" | "hiz";

export const LAMP_NEW_VISUAL = createVisualBinding<LampVisualState>({
    hash: "LAMP",
    nodeName: "lamp",
    minWidth: 32,
    minHeight: 32,
    base: {
        attrs: {
            body: {
                class: "lamp-body",
                stroke: "var(--color-gray-11)",
                "stroke-width": 2,
            },
            icon: {
                class: "lamp-icon",
                d: LAMP_ICON_PATH,
                stroke: "var(--color-gray-1)",
                "stroke-width": 2,
            },
        },
    },
    states: {
        true: {
            attrs: {
                body: {
                    style: "fill: var(--color-true);",
                },
            },
        },
        false: {
            attrs: {
                body: {
                    style: "fill: var(--color-false);",
                },
            },
        },
        x: {
            attrs: {
                body: {
                    style: "fill: var(--color-x);",
                },
            },
        },
        hiz: {
            attrs: {
                body: {
                    style: "fill: var(--color-hiz);",
                },
            },
        },
    },
    resolveState: resolveSingleInputState,
});
