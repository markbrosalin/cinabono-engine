import { LogicValueClass } from "../../model";
import { DEFAULT_VALUE_CLASS, LOGIC_VALUE_CLASSES } from "../../model/constants";

export const pickLogicValueClass = (className?: string): LogicValueClass | undefined => {
    if (!className) return "value-hiz";
    const tokens = className.split(/\s+/).filter(Boolean);
    return tokens.find((t) => (LOGIC_VALUE_CLASSES as readonly string[]).includes(t)) as
        | LogicValueClass
        | undefined;
};

export const getValueClass = (el?: Element | null): LogicValueClass => {
    const className = el?.getAttribute("class") ?? "";
    return pickLogicValueClass(className) || DEFAULT_VALUE_CLASS;
};
