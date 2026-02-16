import { ApiFactories } from "@engine/api";
import { Id } from "@cnbn/schema";
import { SimInputEvent, UpdateIOParams } from "@cnbn/simulation";

export type ApiUpdateItemInput_Payload = { tabId: Id } & UpdateIOParams;

export type ApiUpdateItemInput_Result = {
    tabId: Id;
    inputEvents: SimInputEvent[];
};

export interface ApiUpdateItemInput_Fn {
    (payload: ApiUpdateItemInput_Payload): ApiUpdateItemInput_Result;
}

export const updateItemInputUC = ApiFactories.config((tokens) => ({
    token: tokens.item.updateInput,
    factory: (ctx) => {
        const updateItemInput = ((payload) => {
            const tab = ctx.tools.global.getTab(payload.tabId);
            const inputEvents = tab.ctx.simulation.updateInput({
                itemId: payload.itemId,
                pin: payload.pin,
                value: payload.value,
                t: payload.t,
            });

            return { tabId: tab.id, inputEvents };
        }) as ApiUpdateItemInput_Fn;

        return updateItemInput;
    },
}));
