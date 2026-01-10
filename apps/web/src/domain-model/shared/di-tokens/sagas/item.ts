import { events } from "@gately/domain-model/shared/event-bus";
import { SagaContract } from "@gately/domain-model/shared/saga/contract";
import { createToken } from "@repo/di/helpers";

export const SagaRemoveItemToken =
    createToken<SagaContract<typeof events.RemoveItem>>("SagaRemoveItem");
export const SagaCreateItemToken =
    createToken<SagaContract<typeof events.CreateItem>>("SagaCreateItem");
