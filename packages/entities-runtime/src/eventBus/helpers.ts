export const matchPattern = (event: string, pattern: string): boolean => {
    const regex = new RegExp(
        "^" +
            pattern
                .split(".")
                .map((seg) => (seg === "*" ? "[^.]+?" : seg))
                .join("\\.") +
            "$"
    );
    return regex.test(event);
};
