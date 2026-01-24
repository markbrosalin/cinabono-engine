import { PinSide, SignalClass } from "../../model/types";

export const buildPortClass = (side: PinSide, signalClass: SignalClass): string => {
    const base = side === "input" ? "port port-input" : "port port-output";
    return `${base} ${signalClass}`;
};
