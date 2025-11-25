import { ApiUnlinkSingleItem_Result } from "../../use-cases/internal/UnlinkSingleItem";
import { Id, ItemOfKind, KindKey } from "@cnbn/schema";
export interface ApiRemoveSingleItem_Fn {
    <K extends KindKey>(payload: ApiRemoveSingleItem_Payload<K>): ApiRemoveSingleItem_Result<K>;
}
export type ApiRemoveSingleItem_Payload<K extends KindKey> = {
    tabId: Id;
    itemId: Id;
    kind?: K;
};
export type ApiRemoveSingleItem_Result<K extends KindKey> = {
    removedItem?: ItemOfKind<K>;
    removedLinks: ApiUnlinkSingleItem_Result[];
    tabId: Id;
};
export declare const _removeSingleItemUC: import("../../api").ApiConfigFactory<any>;
//# sourceMappingURL=RemoveSingleItem.d.ts.map