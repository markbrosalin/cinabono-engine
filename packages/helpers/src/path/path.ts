import { WithPath, WithId, Id } from "@cnbn/schema/shared";

export const getPathTo = (item: WithPath & WithId): Id[] => {
    if (!item.id || !item.path) return [];
    return [...item.path, item.id];
};

export const getTabIdFromPath = (path: Id[]): Id => {
    return path[0] ?? [];
};

export const getScopeIdFromPath = (path: Id[]): Id => {
    return path[path.length - 1] ?? [];
};
