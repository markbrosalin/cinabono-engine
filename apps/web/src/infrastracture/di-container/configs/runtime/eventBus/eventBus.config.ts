import { EventBus } from "@gately/infrastracture/event-bus/eventBus";
import { DIConfig } from "@repo/di/types";
import { EventBusContract, EventCallback, EventName } from "@gately/domain-model/shared/event-bus";
import { EventBusToken } from "@gately/domain-model/shared/di-tokens/app/infra";
import { buildEventListeners } from "./listeners";
import { normalizeRecord } from "@repo/utils";

export const eventBusConfig = {
    token: EventBusToken,
    useFactory: async (resolve) => {
        const bus = new EventBus();
        const listeners = await buildEventListeners(resolve);

        for (const [event, handlers] of Object.entries(listeners) as [
            EventName,
            EventCallback<EventName>[],
        ][]) {
            handlers.forEach((handler) => bus.on(event, handler));
        }

        bus.on("*", (event, payload) => {
            // eslint-disable-next-line no-console
            console.log(`[Bus] Event emitted: "${event}"`, normalizeRecord(payload));
        });
        return bus;
    },
} satisfies DIConfig<EventBusContract>;
