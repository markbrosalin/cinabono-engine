import { AppCtxProviderContract } from "@gately/domain-model/shared/context-provider/app/contracts";
import { DIConfig } from "@repo/di/types";
import { AppCtxProviderToken } from "@gately/domain-model/shared/di-tokens/app/providers";
import { AppCtxProvider } from "@gately/infrastracture/context-provider/app";

export const appCtxProviderConfig = {
    token: AppCtxProviderToken,
    useFactory: (resolver) => new AppCtxProvider(resolver),
} satisfies DIConfig<AppCtxProviderContract>;
