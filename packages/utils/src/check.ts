export const exhaustiveCheck = (value: never) => {
    throw new Error(`Unexpected value: ${value}`);
};

export const ensureExists = <T>(value: T | undefined, errorMsg: string): T => {
    if (!value) throw new Error(errorMsg);
    return value;
};
