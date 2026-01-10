import { SimulationService } from "@gately/application-services/simulation/simulation";
import { DIConfig } from "@repo/di/types";
import { SimulationServiceToken } from "@gately/domain-model/shared/di-tokens/tab/services";
import { SimulationServiceContract } from "@gately/domain-model/shared/simulation";
import { createSimulationDependencies } from "./createDependencies.helpers";

export const simulationServiceConfig = {
    token: SimulationServiceToken,
    useFactory: async (resolve) => {
        const deps = await createSimulationDependencies(resolve);
        const service = new SimulationService(deps);
        return service;
    },
} satisfies DIConfig<SimulationServiceContract>;
