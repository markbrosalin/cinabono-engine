"use strict";
// import { DefaultItemOptionsStore } from "./core/store.js";
// import { makeDefaultCtx } from "./core/helpers.js";
// import { ItemOptionsStoreContract } from "./model/contracts.js";
// import { ItemOptionsCtx } from "./model/types.js";
// export interface ItemOptionsStoreFactoryOverrides {
//     initialData?: ItemOptionsCtx;
//     makeItemOptionsStore?: (ctx?: ItemOptionsCtx) => ItemOptionsStoreContract;
// }
// export class ItemOptionsStoreSetup {
//     static init(overrides: ItemOptionsStoreFactoryOverrides = {}): ItemOptionsStoreContract {
//         const ctx = overrides.initialData ?? makeDefaultCtx();
//         const itemOptionsStore =
//             overrides.makeItemOptionsStore?.(ctx) ?? new DefaultItemOptionsStore(ctx);
//         return itemOptionsStore;
//     }
// }
