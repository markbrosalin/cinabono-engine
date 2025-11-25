export const matchPattern = (event, pattern) => {
    const regex = new RegExp("^" +
        pattern
            .split(".")
            .map((seg) => (seg === "*" ? "[^.]+?" : seg))
            .join("\\.") +
        "$");
    return regex.test(event);
};
