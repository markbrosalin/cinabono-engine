export function buildLinkId(...args) {
    if (typeof args[0] === "object") {
        const link = args[0];
        return `${link.fromItemId}:${link.fromPin}:${link.toItemId}:${link.toPin}`;
    }
    else {
        const [from, fPin, to, tPin] = args;
        return `${from}:${fPin}:${to}:${tPin}`;
    }
}
export const parseLinkId = (id) => {
    const [fromItemId, fromPin, toItemId, toPin] = id.split(":");
    return {
        fromItemId,
        fromPin,
        toItemId,
        toPin,
    };
};
export const buildLink = (fromItemId, fromPin, toItemId, toPin) => {
    return {
        fromItemId,
        fromPin,
        toItemId,
        toPin,
    };
};
