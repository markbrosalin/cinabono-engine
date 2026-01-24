import { LogicValue } from "@cnbn/schema";
import { SIGNAL_CLASS_BY_VALUE } from "../model/constants";
import { SignalClass } from "../model/types";

export const logicValueToSignalClass = (value?: LogicValue | null): SignalClass => {
    if (!value) return "signal-x";
    return SIGNAL_CLASS_BY_VALUE[value] ?? "signal-x";
};

export const resolveSignalClass = (value?: LogicValue | null): SignalClass => {
    return logicValueToSignalClass(value);
};
