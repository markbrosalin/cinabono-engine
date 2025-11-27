import { InMemoryCrudStore } from "@cnbn/entities-runtime";
import { BakeStoreContract, ComputeStoreContract } from "../model/contracts.js";
import { BakeTable, ComputeFunction } from "../model/types.js";
import { Hash } from "@cnbn/schema";
export declare class DefaultBakeStore extends InMemoryCrudStore<Hash, BakeTable> implements BakeStoreContract {
}
export declare class DefaultComputeStore extends InMemoryCrudStore<Hash, ComputeFunction> implements ComputeStoreContract {
}
//# sourceMappingURL=stores.d.ts.map