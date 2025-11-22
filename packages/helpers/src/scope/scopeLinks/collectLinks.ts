import { Id, ScopeChildItem, PinIndex } from "@cnbn/schema";
import { toArray } from "@cnbn/utils";
import { LinkIdsResult } from "./scopeLinks";

export const collectLinkIdsByType = (
    scopeItem: ScopeChildItem,
    linkType: keyof typeof scopeItem,
    pin?: PinIndex
): LinkIdsResult => {
    const ids: Id[] = [];
    const byPin: [PinIndex, Id[]][] = [];

    const links = scopeItem[linkType];

    const push = (pin: PinIndex, arr: Id[]) => {
        ids.push(...arr);
        byPin.push([pin, arr]);
    };

    if (links) {
        if (pin !== undefined) {
            const arr = toArray(links[pin]);
            push(pin, arr);
        } else {
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

export const collectLinkIds = (scopeItem: ScopeChildItem): Id[] => {
    return [
        ...collectLinkIdsByType(scopeItem, "inputLinks").flat,
        ...collectLinkIdsByType(scopeItem, "outputLinks").flat,
    ];
};
