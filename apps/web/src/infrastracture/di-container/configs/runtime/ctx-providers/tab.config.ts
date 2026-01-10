import { TabCtxProviderContract } from "@gately/domain-model/shared/context-provider/tab/contracts";
import { DIConfig } from "@repo/di/types";
import { TabCtxProviderToken } from "@gately/domain-model/shared/di-tokens/tab/provider";
import { TabCtxProvider } from "@gately/infrastracture/context-provider/tab";

export const tabCtxProviderConfig = {
    token: TabCtxProviderToken,
    lifetime: "transient",
    useFactory: async (resolve) => new TabCtxProvider(resolve),
} satisfies DIConfig<TabCtxProviderContract>;
