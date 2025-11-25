import { isCircuitItem } from "@cnbn/schema";
import { pinOps } from "@cnbn/helpers";
export const expandInputTargets = ({ getItem }, { itemId, pin: inputPin }) => {
    const item = getItem(itemId);
    if (!item || item.options?.isEnable === false)
        return [];
    if (!isCircuitItem(item))
        return [{ itemId, pin: inputPin }];
    const receivers = pinOps(item).input.items.get(inputPin);
    return receivers;
};
