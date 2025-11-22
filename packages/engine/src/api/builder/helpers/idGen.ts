import { uniqueId } from "@cnbn/utils";

/**
 * @returns 32 bytes hexadecimal UUIDv4 without '-'
 */
export const genTraceId = (): string => {
    return uniqueId().replace(/-/g, "");
};

/**
 * @returns 8 bytes hexadecimal UUIDv4
 */
export const genSpanId = (): string => {
    return uniqueId().split("-")[0];
};
