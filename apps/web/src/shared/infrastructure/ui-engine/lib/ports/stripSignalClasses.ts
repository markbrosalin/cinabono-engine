import { SIGNAL_CLASSES } from "../../model/constants";
import { SignalClass } from "../../model/types";

export const stripSignalClasses = (className?: string): string => {
    if (!className) return "";
    const tokens = className.split(/\s+/).filter(Boolean);
    const filtered = tokens.filter((token) => !SIGNAL_CLASSES.includes(token as SignalClass));
    return filtered.join(" ");
};
