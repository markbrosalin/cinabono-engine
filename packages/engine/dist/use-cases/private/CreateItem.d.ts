import { ItemArgsOfKind, KindKey, WithHash, WithItemKind, WithPath } from "@repo/schema";
import { UCBaseExtended } from "../../use-cases/use-case/UCBaseExtended";
import { ItemBuilderResult } from "../../item-builder/types/ItemBuilder";
export type UCCreateItemPayload<K extends KindKey> = WithPath & Partial<WithItemKind<K>> & WithHash & Partial<ItemArgsOfKind<K>>;
export type UCCreateItemResult = Omit<ItemBuilderResult, "scopes">;
export declare class UCCreateItem extends UCBaseExtended {
    run<K extends KindKey>(payload: UCCreateItemPayload<K>): UCCreateItemResult;
    private _buildItemStep;
    private _saveInStoresStep;
}
//# sourceMappingURL=CreateItem.d.ts.map