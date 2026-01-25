import { LogicValue } from "@cnbn/schema";
import { CLASS_BY_LOGIC_VALUE } from "../model/constants";
import { SignalClass } from "../model/types";

export const logicValueToClass = (value?: LogicValue | null): SignalClass => {
    if (!value) return "value-x";
    return CLASS_BY_LOGIC_VALUE[value] ?? "value-x";
};

export const resolveLogicValueClass = (value?: LogicValue | null): SignalClass => {
    return logicValueToClass(value);
};
