import { EventBus } from "@cnbn/entities-runtime";
import { SimEventPayloads } from "./payloads";

export interface SimulationEventBusContract extends EventBus<SimEventPayloads> {}

export class DefaultSimulationEventBus
    extends EventBus<SimEventPayloads>
    implements SimulationEventBusContract {}
