import type { Node } from "@antv/x6";
import type { LogicValue } from "@cnbn/schema";

export const TOGGLE_ICON_ON_PATH = `M 0 10 L 0 -8 M -5 -3 L 0 -8 L 5 -3`;
export const TOGGLE_ICON_OFF_PATH = `M 0 -10 L 0 8 M -5 3 L 0 8 L 5 3`;

export const LAMP_ICON_PATH =
    `M 0 -8 A 6 6 0 1 1 0 4 A 6 6 0 1 1 0 -8 ` +
    `M -2 4 L -2 8 M 2 4 L 2 8 M -3 8 L 3 8`;

const resolveLampValueClass = (value: LogicValue | undefined): string => {
    switch (value) {
        case "1":
            return "value-true";
        case "0":
            return "value-false";
        case "Z":
            return "value-hiz";
        case "X":
        case "C":
        default:
            return "value-x";
    }
};

export const buildInteractiveNodeAttrs = (
    hash: string,
    value: LogicValue | undefined,
): Record<string, unknown> | undefined => {
    if (hash === "TOGGLE") {
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
    }

    if (hash === "LAMP") {
        const valueClass = resolveLampValueClass(value);
        return {
            body: {
                class: `lamp-body ${valueClass}`,
                stroke: "var(--color-gray-11)",
                "stroke-width": 2,
            },
            icon: {
                class: `lamp-icon ${valueClass}`,
                d: LAMP_ICON_PATH,
                stroke: "var(--color-gray-1)",
                "stroke-width": 2,
            },
        };
    }

    return;
};

export const applyInteractiveNodeVisual = (
    node: Node,
    hash: string,
    value: LogicValue | undefined,
): void => {
    const attrs = buildInteractiveNodeAttrs(hash, value);
    if (!attrs) return;

    for (const [selector, selectorAttrs] of Object.entries(attrs)) {
        if (!selectorAttrs || typeof selectorAttrs !== "object") continue;
        for (const [attrName, attrValue] of Object.entries(selectorAttrs)) {
            node.setAttrByPath(`${selector}/${attrName}`, attrValue as string | number);
        }
    }
};
