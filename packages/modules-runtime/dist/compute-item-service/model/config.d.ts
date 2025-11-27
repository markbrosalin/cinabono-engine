import { BakeStoreContract, Computable, ComputeServiceContract, ComputeStoreContract } from "./contracts.js";
import { BakeMap, ComputeMap, ServiceDeps } from "./types.js";
export interface ComputeFactoriesOverrides {
    bakeMap?: BakeMap;
    computeMap?: ComputeMap;
    makeComputeStore?: (computeMap?: ComputeMap) => ComputeStoreContract;
    makeBakeStore?: (bakeMap?: BakeMap) => BakeStoreContract;
    makeEngine?: (compute: ComputeStoreContract, bake: BakeStoreContract) => Computable;
    makeService?: (deps: ServiceDeps) => ComputeServiceContract;
}
//# sourceMappingURL=config.d.ts.map