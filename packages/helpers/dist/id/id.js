import { uniqueId } from "@cnbn/utils";
export const getOrCreateId = (oldId, oldToNewIdMap) => {
    if (oldToNewIdMap.has(oldId))
        return oldToNewIdMap.get(oldId);
    const newId = uniqueId();
    oldToNewIdMap.set(oldId, newId);
    return newId;
};
export const getMappedId = (oldId, oldToNewIdMap) => {
    return oldToNewIdMap.get(oldId) ?? oldId;
};
export const extractIds = (input) => {
    if (Array.isArray(input)) {
        return input.map((el) => (typeof el === "string" ? el : el.id));
    }
    return [typeof input === "string" ? input : input.id];
};
