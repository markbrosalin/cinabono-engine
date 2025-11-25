import { toArray } from "@cnbn/utils";
export const collectLinkIdsByType = (scopeItem, linkType, pin) => {
    const ids = [];
    const byPin = [];
    const links = scopeItem[linkType];
    const push = (pin, arr) => {
        ids.push(...arr);
        byPin.push([pin, arr]);
    };
    if (links) {
        if (pin !== undefined) {
            const arr = toArray(links[pin]);
            push(pin, arr);
        }
        else {
            for (const pinStr in links) {
                const arr = toArray(links[Number(pinStr)]);
                push(pinStr, arr);
            }
        }
    }
    return {
        flat: ids,
        byPin: byPin,
    };
};
export const collectLinkIds = (scopeItem) => {
    return [
        ...collectLinkIdsByType(scopeItem, "inputLinks").flat,
        ...collectLinkIdsByType(scopeItem, "outputLinks").flat,
    ];
};
