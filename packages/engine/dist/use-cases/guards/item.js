import { E } from "../../errors/index.js";
import { getScopeIdFromPath } from "@cnbn/helpers";
import { hasItemInputPins, hasItemOutputPins, } from "@cnbn/schema";
export const ensureDriverItem = (item) => {
    if (!hasItemOutputPins(item))
        throw E.item.NotDriver(item.id);
    return item;
};
export const ensureReceiverItem = (item) => {
    if (!hasItemInputPins(item))
        throw E.item.NotReceiver(item.id);
    return item;
};
export const ensureSameScope = (itemA, itemB) => {
    const sa = getScopeIdFromPath(itemA.path);
    const sb = getScopeIdFromPath(itemB.path);
    if (sa !== sb)
        throw E.item.NotSameScope(itemA.id, itemB.id, sa, sb);
};
