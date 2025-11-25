export const exhaustiveCheck = (value) => {
    throw new Error(`Unexpected value: ${value}`);
};
export const ensureExists = (value, errorMsg) => {
    if (!value)
        throw new Error(errorMsg);
    return value;
};
