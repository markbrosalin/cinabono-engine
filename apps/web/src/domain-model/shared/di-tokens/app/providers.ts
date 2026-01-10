import { AppCtxProviderContract } from "@gately/domain-model/shared/context-provider/app/contracts";
import { createToken } from "@repo/di/helpers";

export const AppCtxProviderToken = createToken<AppCtxProviderContract>("AppCtxProvider");
