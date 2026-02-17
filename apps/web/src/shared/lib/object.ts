export const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object";
