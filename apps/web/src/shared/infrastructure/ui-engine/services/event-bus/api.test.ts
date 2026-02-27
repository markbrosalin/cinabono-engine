import { describe, expect, it, vi } from "vitest";
import { useEventBusService } from "./api";
import { SIMULATION_BATCH_APPLIED_EVENT } from "../../model/events";

describe("useEventBusService", () => {
    it("emits event to subscribed listener", () => {
        const bus = useEventBusService({} as never, {} as never);
        const listener = vi.fn();

        bus.on(SIMULATION_BATCH_APPLIED_EVENT, listener);
        bus.emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates: [],
        });

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({
            updates: [],
        });
    });

    it("removes listener with off", () => {
        const bus = useEventBusService({} as never, {} as never);
        const listener = vi.fn();

        bus.on(SIMULATION_BATCH_APPLIED_EVENT, listener);
        bus.off(SIMULATION_BATCH_APPLIED_EVENT, listener);
        bus.emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates: [],
        });

        expect(listener).not.toHaveBeenCalled();
    });

    it("removes listener with disposer returned by on", () => {
        const bus = useEventBusService({} as never, {} as never);
        const listener = vi.fn();

        const dispose = bus.on(SIMULATION_BATCH_APPLIED_EVENT, listener);
        dispose();

        bus.emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates: [],
        });

        expect(listener).not.toHaveBeenCalled();
    });

    it("calls once-listener only on first emit", () => {
        const bus = useEventBusService({} as never, {} as never);
        const listener = vi.fn();

        bus.once(SIMULATION_BATCH_APPLIED_EVENT, listener);
        bus.emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates: [],
        });
        bus.emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates: [],
        });

        expect(listener).toHaveBeenCalledTimes(1);
        expect(listener).toHaveBeenCalledWith({
            updates: [],
        });
    });

    it("supports cancelling once-listener before first emit", () => {
        const bus = useEventBusService({} as never, {} as never);
        const listener = vi.fn();

        const dispose = bus.once(SIMULATION_BATCH_APPLIED_EVENT, listener);
        dispose();

        bus.emit(SIMULATION_BATCH_APPLIED_EVENT, {
            updates: [],
        });

        expect(listener).not.toHaveBeenCalled();
    });
});
