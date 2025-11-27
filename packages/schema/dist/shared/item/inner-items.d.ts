import { WithHash, WithState } from "./aspects.js";
import { WithInnerItemLinks } from "./inner-links.js";
import { WithInOutPins } from "./inOutPins.js";
import { WithMeta } from "./meta.js";
import { WithOptions } from "./options.js";
import { KindKey, Id } from "./types.js";
export type WithInnerItemsMap<K extends KindKey> = K extends "circuit:logic" ? {
    items: InnerItemsMap;
} : {};
export type InnerItemsMap = Record<Id, InnerItem>;
export type InnerItem<K extends KindKey = KindKey> = WithHash & WithState<K> & WithInOutPins<K, "template"> & WithOptions<K> & WithMeta<K> & WithInnerItemLinks<K>;
//# sourceMappingURL=inner-items.d.ts.map