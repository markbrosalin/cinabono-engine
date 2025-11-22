import { LogicValue } from "@cnbn/schema/shared";
import { ComputableItem, ServiceDeps } from "../model/types";
import { BakeStoreContract, Computable, ComputeServiceContract } from "../model/contracts";

export class DefaultComputeService implements ComputeServiceContract {
    private readonly _bakeStore: BakeStoreContract;
    private readonly _engine: Computable;

    constructor({ stores, engine }: ServiceDeps) {
        this._bakeStore = stores.bake;
        this._engine = engine;
    }

    public computeOuts(item: ComputableItem): LogicValue[] {
        return this._engine.computeOuts(item);
    }

    public get bakeStore(): BakeStoreContract {
        return this._bakeStore;
    }
}
