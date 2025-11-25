import { Id, ItemLink } from "@repo/schema";
import { UCBaseExtended } from "../../use-cases/use-case/UCBaseExtended";
import { SimInputEvent } from "@repo/simulation";
export type UCLinkItemPayload = {
    link: ItemLink;
    tabId: Id;
};
export type UCLinkItemResult = {
    linkId: Id;
    tabId: Id;
    inputEvents: SimInputEvent[];
};
export declare class UCLinkItem extends UCBaseExtended {
    name: string;
    run({ tabId, link }: UCLinkItemPayload): UCLinkItemResult;
    private _scheduleInputEvent;
}
//# sourceMappingURL=LinkItem.d.ts.map