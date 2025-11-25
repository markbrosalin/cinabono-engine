import { EngineEventMap } from "../eventBus/events";
import { EventBus, GlobalListeners, Listeners } from "@repo/entities-runtime";
export interface EngineEventBusContract extends EventBus<EngineEventMap> {
}
export interface EngineEventBusFactoryOverrides {
    bus?: EngineEventBusContract;
    listeners?: Listeners<EngineEventMap>;
    globalListeners?: GlobalListeners<EngineEventMap>;
}
//# sourceMappingURL=types.d.ts.map