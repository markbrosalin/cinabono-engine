import { UCBaseExtended } from "../../use-casess/api-core";
import { UCRemoveItem } from "../private";
export class UCRemoveManyItems extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "removeItems";
    }
    run(payload) {
        const { tabId } = payload;
        const tasks = "items" in payload ? payload.items : [{ itemId: payload.itemId, kind: payload.kind }];
        const removedItems = tasks.reduce((acc, { itemId, kind }) => {
            const result = new UCRemoveItem(this.ctx).run({ tabId, itemId, kind });
            if (result.removedItem)
                acc.push(result.removedItem);
            return acc;
        }, []);
        if (removedItems.length <= 1)
            return { removedItem: removedItems[0], tabId };
        return { removedItems, tabId };
    }
}
