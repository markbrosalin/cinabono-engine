import { ApiFactories } from "@engine/api";
import { Id } from "@cnbn/schema";
import { SimOutputEvent, UpdateIOParams } from "@cnbn/simulation";

export type ApiUpdateItemOutput_Payload = { tabId: Id } & UpdateIOParams;

export type ApiUpdateItemOutput_Result = {
    tabId: Id;
    outputEvents: SimOutputEvent[];
};

export interface ApiUpdateItemOutput_Fn {
    (payload: ApiUpdateItemOutput_Payload): ApiUpdateItemOutput_Result;
}

export const updateItemOutputUC = ApiFactories.config((tokens) => ({
    token: tokens.item.updateOutput,
    factory: (ctx) => {
        const updateItemOutput = ((payload) => {
            const tab = ctx.tools.global.getTab(payload.tabId);
            const outputEvents = tab.ctx.simulation.updateOutput({
                itemId: payload.itemId,
                pin: payload.pin,
                value: payload.value,
                t: payload.t,
            });

            return { tabId: tab.id, outputEvents };
        }) as ApiUpdateItemOutput_Fn;

        return updateItemOutput;
    },
}));
