import { isDisplayItem, isGeneratorItem, } from "@cnbn/schema";
export const ensureToggle = (id, getItem) => {
    const item = getItem(id);
    if (!item)
        throw new Error(`Item with id "${id}" is undefined`);
    if (!isGeneratorItem(item) || item.hash !== "TOGGLE")
        return;
    return item;
};
export const ensureLamp = (id, getItem) => {
    const item = getItem(id);
    if (!item)
        throw new Error(`Item with id "${id}" is undefined`);
    if (!isDisplayItem(item) || item.hash !== "LAMP")
        return;
    return item;
};
export const ensureMeta = (args) => {
    return (args.meta ?? (args.meta = {}));
};
