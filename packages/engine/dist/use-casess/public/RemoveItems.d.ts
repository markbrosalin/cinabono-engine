import { UCBaseExtended } from "../../use-casess/api-core";
import { UCRemoveItemPayload, UCRemoveItemResult } from "../private";
import { Id, ItemOfKind, KindKey } from "@repo/schema";
type UCRemoveManyItemsPayload<K extends KindKey> = {
    items: Array<Pick<UCRemoveItemPayload<K>, "itemId" | "kind">>;
    tabId: Id;
};
type UCRemoveManyItemsResult<K extends KindKey> = {
    removedItems: Array<ItemOfKind<K>>;
    tabId: Id;
};
export declare class UCRemoveManyItems extends UCBaseExtended {
    name: string;
    run<K extends KindKey>(payload: UCRemoveItemPayload<K>): UCRemoveItemResult<K>;
    run<K extends KindKey>(payload: UCRemoveManyItemsPayload<K>): UCRemoveManyItemsResult<K>;
}
export {};
//# sourceMappingURL=RemoveItems.d.ts.map