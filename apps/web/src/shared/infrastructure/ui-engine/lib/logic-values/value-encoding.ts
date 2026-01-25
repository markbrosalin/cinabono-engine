import { LogicValue } from "@cnbn/schema";
import { CLASS_BY_LOGIC_VALUE } from "../../model/constants";
import { LogicValueClass } from "../../model/types";

export const logicValueToClass = (value?: LogicValue | null): LogicValueClass => {
    if (!value) return "value-x";
    return CLASS_BY_LOGIC_VALUE[value] ?? "value-x";
};

export const resolveLogicValueClass = (value?: LogicValue | null): LogicValueClass => {
    return logicValueToClass(value);
};
