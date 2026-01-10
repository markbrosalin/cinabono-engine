import { TabCtxProviderContract } from "@gately/domain-model/shared/context-provider/tab/contracts";
import { createToken } from "@repo/di/helpers";

export const TabCtxProviderToken = createToken<TabCtxProviderContract>("TabCtxProvider");
