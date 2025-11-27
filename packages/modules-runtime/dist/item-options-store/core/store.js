"use strict";
// import { Id, Item, OptionsOf, SubCategory } from "@cnbn/schema";
// import { ItemOptionsStoreContract } from "../model/contracts.js";
// import {
//   Getter,
//   ItemOptionsCtx,
//   ItemOptionsSnapshot,
//   Setter,
// } from "../model/types.js";
// import { makeDefaultCtx } from "./helpers.js";
// import { createGetters, createSetters } from "./registries/index.js";
// export class DefaultItemOptionsStore implements ItemOptionsStoreContract {
//   private readonly _getters: ReturnType<typeof createGetters>;
//   private readonly _setters: ReturnType<typeof createSetters>;
//   constructor(private readonly _ctx: ItemOptionsCtx = makeDefaultCtx()) {
//     this._getters = createGetters(this._ctx);
//     this._setters = createSetters(this._ctx);
//   }
//   public insert<K extends SubCategory>(
//     item: Item<K>,
//     opts?: Partial<OptionsOf<K>>
//   ): void {
//     if (!opts) return;
//     const setter = this._setters[item.subCategory] as Setter<K>;
//     setter(item.id, opts);
//   }
//   public get<K extends SubCategory>(item: Item<K>): OptionsOf<K> {
//     const getter = this._getters[item.subCategory] as unknown as Getter<K>;
//     return getter(item);
//   }
//   public getDisabled(): IterableIterator<Id> {
//     return this._ctx.disablesSet.values();
//   }
//   public getSymmetrics(): IterableIterator<Id> {
//     return this._ctx.symmetricsSet.values();
//   }
//   public getAutoTriggers(): IterableIterator<Id> {
//     return this._ctx.autoTriggersMap.keys();
//   }
//   public reset(): void {
//     Object.assign(this._ctx, makeDefaultCtx());
//   }
//   public export(): ItemOptionsSnapshot {
//     return {
//       disables: [...this._ctx.disablesSet],
//       symmetrics: [...this._ctx.symmetricsSet],
//       autoTriggers: [...this._ctx.autoTriggersMap.entries()],
//     };
//   }
// }
