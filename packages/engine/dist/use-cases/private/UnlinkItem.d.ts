import { UCBaseExtended } from "../../use-cases/use-case/UCBaseExtended";
import { Id, ItemLink } from "@repo/schema";
import { SimInputEvent } from "@repo/simulation";
export type UCUnlinkItemPayload = {
    tabId: Id;
    linkId: Id;
};
export type UCUnlinkItemResult = {
    removedLink?: ItemLink;
    inputEvents: SimInputEvent[];
};
export declare class UCUnlinkItem extends UCBaseExtended {
    name: string;
    run({ tabId, linkId }: UCUnlinkItemPayload): UCUnlinkItemResult;
    private _scheduleInputEvent;
    private _getPropagatedValue;
}
//# sourceMappingURL=UnlinkItem.d.ts.map