import { Id, ItemLink, PinIndex } from "@cnbn/schema";

export function buildLinkId(
    fromItemId: Id,
    fromPin: PinIndex,
    toItemId: Id,
    toPin: PinIndex
): string;
export function buildLinkId(link: ItemLink): string;
export function buildLinkId(
    ...args: [fromItemId: Id, fromPin: PinIndex, toItemId: Id, toPin: PinIndex] | [link: ItemLink]
): string {
    if (typeof args[0] === "object") {
        const link = args[0] as ItemLink;
        return `${link.fromItemId}:${link.fromPin}:${link.toItemId}:${link.toPin}`;
    } else {
        const [from, fPin, to, tPin] = args as [Id, PinIndex, Id, PinIndex];
        return `${from}:${fPin}:${to}:${tPin}`;
    }
}

export const parseLinkId = (id: string): ItemLink => {
    const [fromItemId, fromPin, toItemId, toPin] = id.split(":");
    return {
        fromItemId,
        fromPin,
        toItemId,
        toPin,
    } as ItemLink;
};

export const buildLink = (
    fromItemId: Id,
    fromPin: PinIndex,
    toItemId: Id,
    toPin: PinIndex
): ItemLink => {
    return {
        fromItemId,
        fromPin,
        toItemId,
        toPin,
    } as ItemLink;
};
