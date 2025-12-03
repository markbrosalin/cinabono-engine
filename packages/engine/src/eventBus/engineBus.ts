import { IEngineEvents } from "@engine/eventBus/events";
import { EventBus } from "@cnbn/entities-runtime";

export interface EngineEventBusContract extends EventBus<IEngineEvents> {}

export class EngineEventBus extends EventBus<IEngineEvents> implements EngineEventBusContract {}
