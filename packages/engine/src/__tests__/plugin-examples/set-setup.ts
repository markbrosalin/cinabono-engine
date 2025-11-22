import { definePlugin } from "@engine/plugins";
import { EVENT_PATTERNS } from "@engine/eventBus";

export const SimpleEventLoggerPlugin = definePlugin("SimpleEventLoggerPlugin", {
    setup: ({ deps }) => {
        const bus = deps.core.bus;

        // Listening to all events
        bus.on(EVENT_PATTERNS.any.event, (data) => {
            console.log("[EngineEvent]: ", data.event);

            // we can also log payload if needed
            // console.log("Payload: ", data.payload);
        });

        console.log("SimpleEventLoggerPlugin initialized and listening to ALL events");
    },
});
