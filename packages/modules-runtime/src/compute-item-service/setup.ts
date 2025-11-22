import {
    defaultBakeMap,
    defaultComputeMap,
    DefaultBakeStore,
    DefaultComputeEngine,
    DefaultComputeStore,
} from "./core";
import { ComputeFactoriesOverrides } from "./model/config";
import { ComputeServiceContract } from "./model/contracts";
import { DefaultComputeService } from "./core/service";

export class ComputeSetup {
    static init(overrides: ComputeFactoriesOverrides = {}): ComputeServiceContract {
        const bakeMap = overrides.bakeMap ?? defaultBakeMap;
        const computeMap = overrides.computeMap ?? defaultComputeMap;

        const bake = overrides.makeBakeStore?.() ?? new DefaultBakeStore(bakeMap);
        const compute = overrides.makeComputeStore?.() ?? new DefaultComputeStore(computeMap);

        const engine =
            overrides.makeEngine?.(compute, bake) ?? new DefaultComputeEngine(compute, bake);

        const serviceDeps = { engine, stores: { bake, compute } };
        const service =
            overrides.makeService?.(serviceDeps) ?? new DefaultComputeService(serviceDeps);

        return service;
    }
}
