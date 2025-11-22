import {
    hasProps,
    Id,
    isDisplayItem,
    isGeneratorItem,
    ItemArgsOfKind,
    ItemOfKind,
    KindKey,
    Read,
    WithMeta,
} from "@cnbn/schema";

export const ensureToggle = (
    id: Id,
    getItem: Read<"item">
): (ItemOfKind<"base:generator"> & { hash: "TOGGLE" }) | undefined => {
    const item = getItem(id);
    if (!item) throw new Error(`Item with id "${id}" is undefined`);

    if (!isGeneratorItem(item) || item.hash !== "TOGGLE") return;

    return item as ItemOfKind<"base:generator"> & { hash: "TOGGLE" };
};

export const ensureLamp = (
    id: Id,
    getItem: Read<"item">
): (ItemOfKind<"base:display"> & { hash: "LAMP" }) | undefined => {
    const item = getItem(id);
    if (!item) throw new Error(`Item with id "${id}" is undefined`);

    if (!isDisplayItem(item) || item.hash !== "LAMP") return;

    return item as ItemOfKind<"base:display"> & { hash: "LAMP" };
};

export const ensureMeta = <K extends KindKey, T extends WithMeta<K>>(
    args: T
): NonNullable<T["meta"]> => {
    return (args.meta ??= {} as NonNullable<WithMeta<K>["meta"]>);
};
