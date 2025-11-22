import { isCircuitItem } from "@cnbn/schema";
import { SimulationCtx } from "../../model";
import { TargetParams } from "./types";
import { pinOps } from "@cnbn/helpers";

export const resolveOutputDriver = (
    { getItem }: Pick<SimulationCtx, "getItem">,
    { itemId, pin }: TargetParams
): TargetParams[] => {
    const item = getItem(itemId);
    if (!item || !item.options?.isEnable === false) return [];

    if (!isCircuitItem(item)) return [{ itemId, pin }];

    const driver = pinOps(item).output.items.get(pin);
    return driver ? [{ itemId: driver.itemId, pin: driver.pin }] : [];
};
