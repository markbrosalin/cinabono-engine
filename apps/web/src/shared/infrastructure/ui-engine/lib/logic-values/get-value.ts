import { DEFAULT_VALUE_CLASS, LOGIC_VALUE_CLASSES } from "../../model/constants";

export const pickLogicValueClass = (className?: string): string | undefined => {
    if (!className) return "";
    const tokens = className.split(/\s+/).filter(Boolean);
    return tokens.find((t) => (LOGIC_VALUE_CLASSES as readonly string[]).includes(t));
};

export const getValueClassFromMagnet = (magnet?: Element | null): string => {
    const className = magnet?.getAttribute("class") ?? "";
    return pickLogicValueClass(className) || DEFAULT_VALUE_CLASS;
};
