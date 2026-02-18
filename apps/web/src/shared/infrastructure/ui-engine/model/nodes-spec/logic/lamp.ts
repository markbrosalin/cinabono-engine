import type { LogicValue } from "@cnbn/schema";
import { CLASS_BY_LOGIC_VALUE } from "../../constants";
import type { BaseLogicSpec, InteractiveNodeAttrs } from ".";

export const LAMP_ICON_PATH =
    `M 0 -8 A 6 6 0 1 1 0 4 A 6 6 0 1 1 0 -8 ` + `M -2 4 L -2 8 M 2 4 L 2 8 M -3 8 L 3 8`;

const resolveLampValueClass = (value: LogicValue | undefined): string => {
    if (!value) return "value-x";
    return CLASS_BY_LOGIC_VALUE[value] ?? "value-x";
};

const buildLampInteractiveAttrs = (value: LogicValue | undefined): InteractiveNodeAttrs => {
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
};

export const LAMP_SPEC: BaseLogicSpec = {
    hash: "LAMP",
    nodeName: "lamp",
    iconPath: LAMP_ICON_PATH,
    minWidth: 32,
    minHeight: 64,
    buildInteractiveAttrs: buildLampInteractiveAttrs,
};
