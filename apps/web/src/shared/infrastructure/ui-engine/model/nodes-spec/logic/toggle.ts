import { createVisualBinding, resolveSingleBinaryOutputState } from "../../visual";

export const TOGGLE_ICON_ON_PATH = `M 0 10 L 0 -8 M -5 -3 L 0 -8 L 5 -3`;
export const TOGGLE_ICON_OFF_PATH = `M 0 -10 L 0 8 M -5 3 L 0 8 L 5 3`;

type ToggleVisualState = "on" | "off";

export const TOGGLE_NEW_VISUAL = createVisualBinding<ToggleVisualState>({
    hash: "TOGGLE",
    nodeName: "toggle",
    minWidth: 32,
    minHeight: 32,
    states: {
        on: {
            attrs: {
                body: {
                    fill: "var(--color-true)",
                },
                icon: {
                    d: TOGGLE_ICON_ON_PATH,
                    stroke: "var(--color-gray-1)",
                },
            },
            class: {
                body: {
                    add: ["toggle-on"],
                    remove: ["toggle-off"],
                },
                icon: {
                    add: ["toggle-on"],
                    remove: ["toggle-off"],
                },
            },
        },
        off: {
            attrs: {
                body: {
                    fill: "var(--color-false)",
                },
                icon: {
                    d: TOGGLE_ICON_OFF_PATH,
                },
            },
            class: {
                body: {
                    add: ["toggle-off"],
                    remove: ["toggle-on"],
                },
                icon: {
                    add: ["toggle-off"],
                    remove: ["toggle-on"],
                },
            },
        },
    },
    resolveState: resolveSingleBinaryOutputState,
});
