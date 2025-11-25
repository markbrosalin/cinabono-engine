import { ItemOfKind } from "@cnbn/schema";
import { WithBasePins, Hash, LogicValue } from "@cnbn/schema/shared";
import { BakeStoreContract, Computable, ComputeStoreContract } from "./contracts";
export type BakeTable = string[];
export type ComputableItem = ItemOfKind & WithBasePins;
export type ComputeFunction = (item: ComputableItem) => LogicValue[];
export type ComputeMap = Map<Hash, ComputeFunction>;
export type BakeMap = Map<Hash, BakeTable>;
type ServiceStores = {
    compute: ComputeStoreContract;
    bake: BakeStoreContract;
};
export type ServiceDeps = {
    stores: ServiceStores;
    engine: Computable;
};
export {};
//# sourceMappingURL=types.d.ts.map