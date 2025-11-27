"use strict";
// import type { Id, Item, OptionsOf, SubCategory } from "@cnbn/schema";
// import { ItemOptionsSnapshot } from "./types.js";
// import { Exportable, Resettable } from "@cnbn/entities-runtime";
// export interface ItemOptionsInsertable {
//   insert<K extends SubCategory>(
//     item: Item<K>,
//     opts?: Partial<OptionsOf<K>>
//   ): void;
// }
// export interface ItemOptionsReadable {
//   get<K extends SubCategory>(item: Item<K>): OptionsOf<K>;
// }
// export interface DisableAware {
//   getDisabled(): IterableIterator<Id>;
// }
// export interface SymmetricAware {
//   getSymmetrics(): IterableIterator<Id>;
// }
// export interface AutoTriggersAware {
//   getAutoTriggers(): IterableIterator<Id>;
// }
// export interface OptionsAware
//   extends DisableAware,
//     SymmetricAware,
//     AutoTriggersAware {}
// export interface ItemOptionsStoreContract
//   extends Resettable,
//     ItemOptionsInsertable,
//     ItemOptionsReadable,
//     Exportable<ItemOptionsSnapshot>,
//     OptionsAware {}
