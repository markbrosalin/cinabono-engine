import { UCBaseExtended } from "../../use-casess/api-core";
import { UCUnlinkItemPayload, UCUnlinkItemResult } from "../private";
import { Id, ItemLink } from "@repo/schema";
type UCUnlinkManyItemsPayload = {
    linkIds: Id[];
    tabId: Id;
};
type UCUnlinkManyItemsResult = {
    removedLinks: ItemLink[];
    tabId: Id;
} & Pick<UCUnlinkItemResult, "inputEvents">;
export declare class UCUnlinkManyItems extends UCBaseExtended {
    name: string;
    run(payload: UCUnlinkItemPayload): UCUnlinkItemResult;
    run(payload: UCUnlinkManyItemsPayload): UCUnlinkManyItemsResult;
    private _unlinkBatch;
}
export {};
//# sourceMappingURL=UnlinkItems.d.ts.map