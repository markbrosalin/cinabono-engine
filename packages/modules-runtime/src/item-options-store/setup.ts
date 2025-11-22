// import { DefaultItemOptionsStore } from "./core/store";
// import { makeDefaultCtx } from "./core/helpers";
// import { ItemOptionsStoreContract } from "./model/contracts";
// import { ItemOptionsCtx } from "./model/types";

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
