import { EngineEventMap } from "../eventBus/events/index.js";
import { EventBus } from "@cnbn/entities-runtime";
export interface EngineEventBusContract extends EventBus<EngineEventMap> {
}
export declare class EngineEventBus extends EventBus<EngineEventMap> implements EngineEventBusContract {
}
//# sourceMappingURL=engineBus.d.ts.map