// import {
//   ItemOptions,
//   Id,
//   OptionsMap,
//   SubCategory,
//   Entries,
//   Item,
// } from "@cnbn/schema";

// export interface ItemOptionsCtx {
//   autoTriggersMap: AutoTriggersOptMap;
//   disablesSet: DisablesOptSet;
//   symmetricsSet: SymmetricsOptSet;
// }

// export interface ItemOptionsSnapshot {
//   disables: Id[];
//   symmetrics: Id[];
//   autoTriggers: Entries<Id, ItemOptions["autoTriggers"]>;
// }

// export type AutoTriggersOptMap = Map<Id, ItemOptions["autoTriggers"]>;
// export type DisablesOptSet = Set<Id>;
// export type SymmetricsOptSet = Set<Id>;

// export type Setter<K extends SubCategory> = (
//   itemId: Id,
//   opts: Partial<OptionsMap[K]>
// ) => void;
// export type Getter<K extends SubCategory> = (item: Item<K>) => OptionsMap[K];

// export type SetterMap = { [K in SubCategory]: Setter<K> };
// export type GetterMap = { [K in SubCategory]: Getter<K> };
