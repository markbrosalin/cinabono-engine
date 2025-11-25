import { hasProps } from "../primitives/guards";
import { getItemCategory } from "../shared/helpers";
export const isItem = (value) => hasProps(value, "id", "hash", "path", "kind", "name");
export const isItemOf = (value, kind) => isItem(value) && value.kind === kind;
export const isLogicItem = (i) => isItemOf(i, "base:logic");
export const isGeneratorItem = (i) => isItemOf(i, "base:generator");
export const isDisplayItem = (i) => isItemOf(i, "base:display");
export const isCircuitItem = (i) => isItemOf(i, "circuit:logic");
export const isBaseItem = (i) => isItem(i) && getItemCategory(i.kind) === "base";
export const hasItemInputPins = (entity) => {
    return hasProps(entity, "inputPins");
};
export const hasItemOutputPins = (entity) => {
    return hasProps(entity, "outputPins");
};
export const hasPinInputItems = (pin) => {
    return hasProps(pin, "inputItems");
};
export const hasPinOutputItem = (pin) => {
    return hasProps(pin, "outputItem");
};
export const isOnePinBaseLogic = (i) => {
    return ["BUFFER", "NOT"].includes(i.hash);
};
