export const hasProps = (obj, ...keys) => typeof obj === "object" && obj !== null && keys.every((key) => key in obj);
