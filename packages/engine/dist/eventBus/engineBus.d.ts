import { IEngineEvents } from "../eventBus/events/index.js";
import { EventBus } from "@cnbn/entities-runtime";
export interface EngineEventBusContract extends EventBus<IEngineEvents> {
}
export declare class EngineEventBus extends EventBus<IEngineEvents> implements EngineEventBusContract {
}
//# sourceMappingURL=engineBus.d.ts.map