import { DIConfig } from "@repo/di/types";
import { ScopeServiceToken } from "@gately/domain-model/shared/di-tokens/tab/services";
import { makeScopeService } from "@repo/modules-runtime/scope/factory";
import { ScopeServiceContract } from "@repo/modules-runtime/scope/contracts";

export const scopeServiceConfig = {
    token: ScopeServiceToken,
    useFactory: () => makeScopeService(),
} satisfies DIConfig<ScopeServiceContract>;
