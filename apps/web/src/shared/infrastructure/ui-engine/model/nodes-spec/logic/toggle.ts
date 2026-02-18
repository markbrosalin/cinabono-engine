import type { LogicValue } from "@cnbn/schema";
import type { BaseLogicSpec, InteractiveNodeAttrs } from ".";

export const TOGGLE_ICON_ON_PATH = `M 0 10 L 0 -8 M -5 -3 L 0 -8 L 5 -3`;
export const TOGGLE_ICON_OFF_PATH = `M 0 -10 L 0 8 M -5 3 L 0 8 L 5 3`;

const buildToggleInteractiveAttrs = (value: LogicValue | undefined): InteractiveNodeAttrs => {
    const isOn = value === "1";

    return {
        body: {
            class: `toggle-body ${isOn ? "toggle-on" : "toggle-off"}`,
            fill: isOn ? "var(--color-primary-3)" : "var(--color-gray-1)",
            stroke: isOn ? "var(--color-primary-9)" : "var(--color-gray-11)",
        },
        icon: {
            class: `toggle-icon ${isOn ? "toggle-on" : "toggle-off"}`,
            d: isOn ? TOGGLE_ICON_ON_PATH : TOGGLE_ICON_OFF_PATH,
            stroke: isOn ? "var(--color-true)" : "var(--color-gray-9)",
            "stroke-width": 2.25,
        },
    };
};

export const TOGGLE_SPEC: BaseLogicSpec = {
    hash: "TOGGLE",
    nodeName: "toggle",
    iconPath: TOGGLE_ICON_OFF_PATH,
    minWidth: 32,
    minHeight: 32,
    buildInteractiveAttrs: buildToggleInteractiveAttrs,
};
