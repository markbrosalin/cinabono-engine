export const getItemCategory = (kind) => {
    return kind.split(":")[0];
};
export const getItemRole = (kind) => {
    return kind.split(":")[1];
};
