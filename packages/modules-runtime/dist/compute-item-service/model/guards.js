import { hasItemInputPins, hasItemOutputPins, isCircuitItem, isItem, } from "@cnbn/schema";
export const isComputableItem = (arg) => {
    return isItem(arg) && hasItemInputPins(arg) && hasItemOutputPins(arg);
};
export const isBakedItem = (arg) => {
    return isCircuitItem(arg) && arg.options?.baked === true;
};
