import { ApiFactories } from "@engine/api";
import { Id } from "@cnbn/schema";
import { RunConfig, RunnerResult } from "@cnbn/simulation";

export type ApiSimulateTab_Payload = {
    tabId: Id;
    runCfg?: Partial<RunConfig>;
};

export type ApiSimulateTab_Result = {
    tabId: Id;
    result: RunnerResult;
    events: RunnerResult["updatesPerBatch"];
    tickEvents: RunnerResult["updatesPerTick"];
};

export interface ApiSimulateTab_Fn {
    (payload: ApiSimulateTab_Payload): ApiSimulateTab_Result;
}

export const simulateTabUC = ApiFactories.config((tokens) => ({
    token: tokens.simulation.simulate,
    factory: (ctx) => {
        const simulateTab = ((payload) => {
            const tab = ctx.tools.global.getTab(payload.tabId);
            const result = tab.ctx.simulation.simulate(payload.runCfg);

            return {
                tabId: tab.id,
                result,
                events: result.updatesPerBatch,
                tickEvents: result.updatesPerTick,
            };
        }) as ApiSimulateTab_Fn;

        return simulateTab;
    },
}));
