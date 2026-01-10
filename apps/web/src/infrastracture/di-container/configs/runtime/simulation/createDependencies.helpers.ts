import { EventBusToken } from "@gately/domain-model/shared/di-tokens/app/infra";
import { ComputeServiceToken } from "@gately/domain-model/shared/di-tokens/app/services";
import {
    ItemServiceToken,
    LinkServiceToken,
    ScopeServiceToken,
} from "@gately/domain-model/shared/di-tokens/tab/services";
import {
    SimulationDependencies,
    StepSimulator,
    SimulatorContext,
} from "@gately/domain-model/shared/simulation";
import { EmitterStore, ReceiverStore } from "@gately/domain-model/shared/simulation/stores";
import { Resolve } from "@repo/di/types";

export const createSimulationDependencies = async (
    resolve: Resolve
): Promise<SimulationDependencies> => {
    const itemService = await resolve(ItemServiceToken);
    const scopeService = await resolve(ScopeServiceToken);
    const linkService = await resolve(LinkServiceToken);
    const eventBus = await resolve(EventBusToken);
    const computeService = await resolve(ComputeServiceToken);

    const simulationTools = {
        SIMULATOR: new StepSimulator(),
    };

    const simulatorToolCtx: SimulatorContext = {
        state: {
            emitters: new EmitterStore(),
            receivers: new ReceiverStore(),
        },
        stores: {
            itemStore: itemService.store.readonly(),
            scopeStore: scopeService.store.readonly(),
            linkStore: linkService.store.readonly(),
            bakeStore: computeService.bakedStore.readonly(),
            computeStore: computeService.computeStore,
        },
        tools: {
            compute: computeService.tools.COMPUTE,
        },
    };

    return {
        eventBus,
        ctx: simulatorToolCtx,
        tools: simulationTools,
        state: { delay: 10, isPaused: false },
    };
};
