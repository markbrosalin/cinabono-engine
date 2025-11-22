import { Entries, Hash, LogicValue } from "@cnbn/schema";
import { ComputeFunction, BakeTable, ComputableItem } from "./types";
import { CrudStore, ReadonlyStore, Exportable } from "@cnbn/entities-runtime";

export type ComputeStoreContract = ReadonlyStore<Hash, ComputeFunction>;
export type BakeStoreContract = CrudStore<Hash, BakeTable> & Exportable<Entries<Hash, BakeTable>>;

export interface ComputeServiceContract extends Computable {
    get bakeStore(): BakeStoreContract;
}

export interface Computable {
    computeOuts(item: ComputableItem): LogicValue[];
}
