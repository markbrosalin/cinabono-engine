import { LogicValue } from "@cnbn/schema";
import { ComputableItem } from "../model/types.js";
import { BakeStoreContract, Computable, ComputeStoreContract } from "../model/contracts.js";
export declare class DefaultComputeEngine implements Computable {
    private readonly _compute;
    private readonly _bake;
    constructor(_compute: ComputeStoreContract, _bake: BakeStoreContract);
    computeOuts(item: ComputableItem): LogicValue[];
    private _computeLogic;
    private _computeBaked;
}
//# sourceMappingURL=engine.d.ts.map