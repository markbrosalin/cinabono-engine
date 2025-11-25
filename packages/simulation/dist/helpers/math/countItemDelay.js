import { getItemDelay, pinOps } from "@cnbn/helpers/item";
import { isDisplayItem } from "@cnbn/schema";
export const countItemDelay = (item, oldValue, newValue) => {
    const { rise, fall } = getItemDelay(item);
    if (oldValue === "0" && newValue === "1")
        return rise;
    if (oldValue === "1" && newValue === "0")
        return fall;
    if (oldValue === newValue)
        return 0;
    return Math.max(rise, fall);
};
export const countLampDelay = (target, ctx, newValue) => {
    const item = ctx.getItem(target.itemId);
    if (!isDisplayItem(item))
        return 0;
    const oldValue = pinOps(item).input.value.get(target.pin);
    const delay = countItemDelay(item, oldValue, newValue);
    return delay;
};
