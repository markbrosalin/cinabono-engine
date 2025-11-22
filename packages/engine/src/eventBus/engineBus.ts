import { EngineEventMap } from "@engine/eventBus/events";
import { EventBus } from "@cnbn/entities-runtime";

export interface EngineEventBusContract extends EventBus<EngineEventMap> {}

export class EngineEventBus extends EventBus<EngineEventMap> implements EngineEventBusContract {}
