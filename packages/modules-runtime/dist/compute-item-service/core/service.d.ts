import { LogicValue } from "@cnbn/schema/shared";
import { ComputableItem, ServiceDeps } from "../model/types";
import { BakeStoreContract, ComputeServiceContract } from "../model/contracts";
export declare class DefaultComputeService implements ComputeServiceContract {
    private readonly _bakeStore;
    private readonly _engine;
    constructor({ stores, engine }: ServiceDeps);
    computeOuts(item: ComputableItem): LogicValue[];
    get bakeStore(): BakeStoreContract;
}
//# sourceMappingURL=service.d.ts.map