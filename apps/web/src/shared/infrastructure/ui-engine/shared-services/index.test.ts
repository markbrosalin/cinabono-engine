import { describe, expect, it, vi } from "vitest";
import { createEventBus } from "./index";

describe("createEventBus", () => {
    it("subscribes, emits, unsubscribes and supports once listeners", () => {
        const bus = createEventBus();
        const listener = vi.fn();
        const onceListener = vi.fn();

        const off = bus.on("simulation:batch-applied", listener);
        bus.once("simulation:batch-applied", onceListener);

        bus.emit("simulation:batch-applied", {
            updates: [],
        });
        bus.emit("simulation:batch-applied", {
            updates: [],
        });

        off();
        bus.emit("simulation:batch-applied", {
            updates: [],
        });

        expect(listener).toHaveBeenCalledTimes(2);
        expect(onceListener).toHaveBeenCalledTimes(1);
    });
});
