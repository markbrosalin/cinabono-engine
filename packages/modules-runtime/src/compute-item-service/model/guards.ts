import {
    CircuitItem,
    hasItemInputPins,
    hasItemOutputPins,
    isCircuitItem,
    isItem,
} from "@cnbn/schema";
import { ComputableItem } from "./types";

export const isComputableItem = (arg: unknown): arg is ComputableItem => {
    return isItem(arg) && hasItemInputPins(arg) && hasItemOutputPins(arg);
};

export const isBakedItem = (arg: unknown): arg is CircuitItem => {
    return isCircuitItem(arg) && arg.options?.baked === true;
};
