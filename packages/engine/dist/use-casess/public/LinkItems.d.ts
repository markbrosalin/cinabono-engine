import { UCLinkItemPayload, UCLinkItemResult } from "../private";
import { UCBaseExtended } from "../api-core";
import { Id, ItemLink } from "@repo/schema";
type UCLinkManyItemsPayload = {
    tabId: Id;
    links: ItemLink[];
};
type UCLinkManyItemsResult = {
    tabId: Id;
    linkIds: Id[];
} & Pick<UCLinkItemResult, "inputEvents">;
export declare class UCLinkManyItems extends UCBaseExtended {
    name: string;
    run(payload: UCLinkItemPayload): UCLinkItemResult;
    run(payload: UCLinkManyItemsPayload): UCLinkManyItemsResult;
    private _saveBatch;
}
export {};
//# sourceMappingURL=LinkItems.d.ts.map