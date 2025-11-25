export const getPathTo = (item) => {
    if (!item.id || !item.path)
        return [];
    return [...item.path, item.id];
};
export const getTabIdFromPath = (path) => {
    return path[0] ?? [];
};
export const getScopeIdFromPath = (path) => {
    return path[path.length - 1] ?? [];
};
