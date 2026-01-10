import { Saga } from "@repo/entities-runtime/saga";
import { SagaContext, SagaPayload } from "./types";
import { EventName } from "../event-bus";

export abstract class SagaContract<E extends EventName> extends Saga<SagaContext, SagaPayload<E>> {}
