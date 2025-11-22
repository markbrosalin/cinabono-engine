import { getItemDelay, pinOps } from "@cnbn/helpers/item";
import { isDisplayItem } from "@cnbn/schema";
import { ItemOfKind, LogicValue, PinIndex } from "@cnbn/schema/shared";
import { TargetParams } from "@sim/helpers/circuit-resolving";
import { SimulationCtx } from "@sim/model";

export const countItemDelay = (
    item: ItemOfKind,
    oldValue: LogicValue,
    newValue: LogicValue
): number => {
    const { rise, fall } = getItemDelay(item);
    if (oldValue === "0" && newValue === "1") return rise;
    if (oldValue === "1" && newValue === "0") return fall;
    if (oldValue === newValue) return 0;
    return Math.max(rise, fall);
};

export const countLampDelay = (
    target: TargetParams,
    ctx: Pick<SimulationCtx, "getItem">,
    newValue: LogicValue
): number => {
    const item = ctx.getItem(target.itemId);
    if (!isDisplayItem(item)) return 0;

    const oldValue = pinOps(item).input.value.get(target.pin);
    const delay = countItemDelay(item, oldValue, newValue);
    return delay;
};
