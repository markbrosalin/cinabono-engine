import { SagaCreateItem } from "@gately/application-services/sagas/item/itemCreate";
import { SagaCreateItemToken } from "@gately/domain-model/shared/di-tokens/sagas/item";
import { DIConfig } from "@repo/di/types";

export const sagaCreateItemConfig = {
    token: SagaCreateItemToken,
    useClass: SagaCreateItem,
} satisfies DIConfig<SagaCreateItem>;
