import { PinSide, LogicValueClass } from "../../model/types";

export const buildPortClass = (side: PinSide, signalClass: LogicValueClass): string => {
    const base = side === "input" ? "port port-input" : "port port-output";
    return `${base} ${signalClass}`;
};
