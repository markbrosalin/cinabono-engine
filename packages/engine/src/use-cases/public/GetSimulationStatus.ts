import { ApiFactories } from "@engine/api";
import { Id } from "@cnbn/schema";
import { SimulationStatus } from "@cnbn/simulation";

export type ApiSimulationStatus_Payload = {
    tabId: Id;
};

export type ApiSimulationStatus_Result = {
    tabId: Id;
    status: SimulationStatus;
};

export interface ApiSimulationStatus_Fn {
    (payload: ApiSimulationStatus_Payload): ApiSimulationStatus_Result;
}

export const simulationStatusUC = ApiFactories.config((tokens) => ({
    token: tokens.simulation.status,
    factory: (ctx) => {
        const getSimulationStatus = ((payload) => {
            const tab = ctx.tools.global.getTab(payload.tabId);
            const status = tab.ctx.simulation.getStatus();

            return {
                tabId: tab.id,
                status,
            };
        }) as ApiSimulationStatus_Fn;

        return getSimulationStatus;
    },
}));
