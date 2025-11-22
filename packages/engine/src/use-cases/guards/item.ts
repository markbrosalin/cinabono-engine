import { E } from "@engine/errors";
import { getScopeIdFromPath } from "@cnbn/helpers";
import {
    hasItemInputPins,
    hasItemOutputPins,
    ItemOfKind,
    KindKey,
    WithInputPins,
    WithOutputPins,
} from "@cnbn/schema";

export const ensureDriverItem = <K extends KindKey, T extends ItemOfKind<K>>(
    item: T
): T & WithOutputPins<"item"> => {
    if (!hasItemOutputPins(item)) throw E.item.NotDriver(item.id);
    return item;
};

export const ensureReceiverItem = <K extends KindKey, T extends ItemOfKind<K>>(
    item: T
): T & WithInputPins<"item"> => {
    if (!hasItemInputPins(item)) throw E.item.NotReceiver(item.id);
    return item;
};

export const ensureSameScope = (itemA: ItemOfKind, itemB: ItemOfKind) => {
    const sa = getScopeIdFromPath(itemA.path);
    const sb = getScopeIdFromPath(itemB.path);
    if (sa !== sb) throw E.item.NotSameScope(itemA.id, itemB.id, sa, sb);
};
