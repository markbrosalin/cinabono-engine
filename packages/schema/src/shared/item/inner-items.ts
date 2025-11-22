import { WithHash, WithState } from "./aspects";
import { WithInnerItemLinks } from "./inner-links";
import { WithInOutPins } from "./inOutPins";
import { WithMeta } from "./meta";
import { WithOptions } from "./options";
import { KindKey, Id } from "./types";

export type WithInnerItemsMap<K extends KindKey> = K extends "circuit:logic"
    ? { items: InnerItemsMap }
    : {};

export type InnerItemsMap = Record<Id, InnerItem>;

export type InnerItem<K extends KindKey = KindKey> = WithHash &
    WithState<K> &
    WithInOutPins<K, "template"> &
    WithOptions<K> &
    WithMeta<K> &
    WithInnerItemLinks<K>;
