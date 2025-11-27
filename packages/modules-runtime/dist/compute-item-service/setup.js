import { defaultBakeMap, defaultComputeMap, DefaultBakeStore, DefaultComputeEngine, DefaultComputeStore, } from "./core/index.js";
import { DefaultComputeService } from "./core/service.js";
export class ComputeSetup {
    static init(overrides = {}) {
        const bakeMap = overrides.bakeMap ?? defaultBakeMap;
        const computeMap = overrides.computeMap ?? defaultComputeMap;
        const bake = overrides.makeBakeStore?.() ?? new DefaultBakeStore(bakeMap);
        const compute = overrides.makeComputeStore?.() ?? new DefaultComputeStore(computeMap);
        const engine = overrides.makeEngine?.(compute, bake) ?? new DefaultComputeEngine(compute, bake);
        const serviceDeps = { engine, stores: { bake, compute } };
        const service = overrides.makeService?.(serviceDeps) ?? new DefaultComputeService(serviceDeps);
        return service;
    }
}
