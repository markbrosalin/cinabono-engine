import { Id, ItemOfKind, KindKey } from "@repo/schema";
import { UCBaseExtended } from "../api-core/UCBaseExtended";
export type UCRemoveItemPayload<K extends KindKey> = {
    tabId: Id;
    itemId: Id;
    kind?: K;
};
export type UCRemoveItemResult<K extends KindKey> = {
    removedItem?: ItemOfKind<K>;
    tabId: Id;
};
export declare class UCRemoveItem extends UCBaseExtended {
    name: string;
    run<K extends KindKey>({ tabId, itemId, }: UCRemoveItemPayload<K>): UCRemoveItemResult<K>;
    private _removeInOutLinksFromScopeStep;
    private _removeCircuitInnerElemsStep;
}
//# sourceMappingURL=RemoveItem.d.ts.map