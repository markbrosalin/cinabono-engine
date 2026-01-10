import { events } from "@gately/domain-model/shared/event-bus";
import { SagaContract } from "@gately/domain-model/shared/saga/contract";
import { createToken } from "@repo/di/helpers";

export const SagaRemoveTabToken =
    createToken<SagaContract<typeof events.RemoveTab>>("SagaRemoveTab");
export const SagaCreateTabToken =
    createToken<SagaContract<typeof events.CreateTab>>("SagaCreateTab");
