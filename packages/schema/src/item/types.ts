import {
    WithState,
    KindKey,
    WithMeta,
    WithOptions,
    WithId,
    WithHash,
    WithPath,
    WithInOutPins,
    ItemOfKind,
    KindsWithRole,
} from "../shared";
export type Item<K extends KindKey = KindKey> = WithId &
    WithPath &
    WithHash &
    WithState<K> &
    WithMeta<K> &
    WithOptions<K> &
    WithInOutPins<K, "item">;

export type GeneratorItem = Item<"base:generator">;
export type LogicItem = Item<"base:logic">;
export type DisplayItem = Item<"base:display">;
export type CircuitItem = Item<"circuit:logic">;

export type BaseItem = GeneratorItem | LogicItem | DisplayItem;
export type OnlyLogicItems = ItemOfKind<KindsWithRole<"logic">>;
