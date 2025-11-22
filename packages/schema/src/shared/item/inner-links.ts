import { WithOf } from "../shared";
import { PinIndex, Id, KindKey } from "./types";

export type InnerItemInputLinks = Record<PinIndex, Id>;
export type InnerItemOutputLinks = Record<PinIndex, Id[]>;
export type InnerItemInOutLinks = InnerItemInputLinks | InnerItemOutputLinks;

export type WithInnerItemOutputLinks = { outputLinks?: InnerItemOutputLinks };
export type WithInnerItemInputLinks = { inputLinks?: InnerItemInputLinks };

export type WithInnerItemInOutLinks = WithInnerItemOutputLinks &
    WithInnerItemInputLinks;

export type WithInnerItemLinks<K extends KindKey> = WithOf<
    K,
    InnerItemLinksMap
>;

export type InnerItemLinksMap = {
    base: {
        generator: WithInnerItemOutputLinks;
        logic: WithInnerItemInOutLinks;
        display: WithInnerItemInputLinks;
    };
    circuit: { logic: WithInnerItemInOutLinks };
};
