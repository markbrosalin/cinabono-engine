import { definePlugin } from "@engine/plugins";
import { EngineEvents } from "@engine/eventBus";

export const SimpleEventLoggerPlugin = definePlugin("SimpleEventLoggerPlugin", {
    setup: ({ deps }) => {
        const bus = deps.core.bus;

        // Listening to all events
        bus.on(EngineEvents.any.event, (data) => {
            console.log("[EngineEvent]: ", data.event);

            // we can also log payload if needed
            // console.log("Payload: ", data.payload);
        });

        console.log("SimpleEventLoggerPlugin initialized and listening to ALL events");
    },
});
