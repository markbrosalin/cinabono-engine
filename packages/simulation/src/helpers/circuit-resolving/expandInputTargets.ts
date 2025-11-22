import { isCircuitItem } from "@cnbn/schema";
import { SimulationCtx } from "@sim/model";
import { TargetParams } from "./types";
import { pinOps } from "@cnbn/helpers";

export const expandInputTargets = (
    { getItem }: Pick<SimulationCtx, "getItem">,
    { itemId, pin: inputPin }: TargetParams
): TargetParams[] => {
    const item = getItem(itemId);
    if (!item || item.options?.isEnable === false) return [];

    if (!isCircuitItem(item)) return [{ itemId, pin: inputPin }];

    const receivers = pinOps(item).input.items.get(inputPin);
    return receivers;
};
