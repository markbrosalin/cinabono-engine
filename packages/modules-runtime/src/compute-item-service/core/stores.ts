import { InMemoryCrudStore } from "@cnbn/entities-runtime";
import { BakeStoreContract, ComputeStoreContract } from "../model/contracts";
import { BakeTable, ComputeFunction } from "../model/types";
import { Hash } from "@cnbn/schema";

export class DefaultBakeStore
    extends InMemoryCrudStore<Hash, BakeTable>
    implements BakeStoreContract {}

export class DefaultComputeStore
    extends InMemoryCrudStore<Hash, ComputeFunction>
    implements ComputeStoreContract {}
