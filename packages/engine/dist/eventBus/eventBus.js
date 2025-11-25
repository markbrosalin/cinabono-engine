import { BaseEventBus } from "@repo/entities-runtime";
export class DefaultEngineEventBus extends BaseEventBus {
}
export class EngineEventBusSetup {
    static init(overrides = {}) {
        const listeners = overrides.listeners ?? new Map();
        const globalListeners = overrides.globalListeners ?? new Set();
        const args = { listeners, globalListeners };
        const bus = overrides.bus ?? new DefaultEngineEventBus(args);
        return bus;
    }
}
