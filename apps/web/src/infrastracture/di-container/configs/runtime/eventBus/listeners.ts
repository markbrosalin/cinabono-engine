import { SagaCreateItemToken } from "@gately/domain-model/shared/di-tokens/sagas/item";
import {
    SagaCreateTabToken,
    SagaRemoveTabToken,
} from "@gately/domain-model/shared/di-tokens/sagas/tab";
import { EventCallbackMap, events } from "@gately/domain-model/shared/event-bus";
import { Resolve } from "@repo/di";

export const buildEventListeners = async (resolve: Resolve): Promise<Partial<EventCallbackMap>> => {
    return {
        [events.CreateItem]: [
            async (payload) => {
                const saga = await resolve(SagaCreateItemToken);
                saga.execute(payload);
            },
        ],
        [events.RemoveItem]: [],
        [events.CreateTab]: [
            async (payload) => {
                const saga = await resolve(SagaCreateTabToken);
                saga.execute(payload);
            },
        ],
        [events.RemoveTab]: [
            async (payload) => {
                const saga = await resolve(SagaRemoveTabToken);
                saga.execute(payload);
            },
        ],
    };
};
