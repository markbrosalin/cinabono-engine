import { SagaCreateTab } from "@gately/application-services/sagas/tab/tabCreate";
import { SagaRemoveTab } from "@gately/application-services/sagas/tab/tabRemove";
import { DIConfig } from "@repo/di/types";
import {
    SagaCreateTabToken,
    SagaRemoveTabToken,
} from "@gately/domain-model/shared/di-tokens/sagas/tab";

export const sagaCreateTabConfig = {
    token: SagaCreateTabToken,
    useClass: SagaCreateTab,
} satisfies DIConfig<SagaCreateTab>;

export const sagaRemoveTabConfig = {
    token: SagaRemoveTabToken,
    useClass: SagaRemoveTab,
} satisfies DIConfig<SagaRemoveTab>;
