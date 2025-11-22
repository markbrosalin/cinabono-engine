import { Id, WithId } from "@cnbn/schema/shared";
import { uniqueId } from "@cnbn/utils";

export const getOrCreateId = (oldId: Id, oldToNewIdMap: Map<Id, Id>): string => {
    if (oldToNewIdMap.has(oldId)) return oldToNewIdMap.get(oldId)!;
    const newId = uniqueId();
    oldToNewIdMap.set(oldId, newId);
    return newId;
};

export const getMappedId = (oldId: Id, oldToNewIdMap: Map<Id, Id>): Id => {
    return oldToNewIdMap.get(oldId) ?? oldId;
};

export const extractIds = (input: Id | Id[] | WithId | WithId[]): Id[] => {
    if (Array.isArray(input)) {
        return input.map((el) => (typeof el === "string" ? el : el.id));
    }
    return [typeof input === "string" ? input : input.id];
};
