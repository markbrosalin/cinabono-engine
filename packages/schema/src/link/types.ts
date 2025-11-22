import { Id, PinIndex } from "../shared";

export interface ItemLink {
    fromItemId: Id;
    fromPin: PinIndex;
    toItemId: Id;
    toPin: PinIndex;
}
