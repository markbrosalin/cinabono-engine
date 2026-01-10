import { DIConfig } from "@repo/di/types";
import { LinkServiceToken } from "@gately/domain-model/shared/di-tokens/tab/services";
import { makeLinkService } from "@repo/modules-runtime/link/factory";
import { LinkServiceContract } from "@repo/modules-runtime/link/contracts";

export const linkServiceConfig = {
    token: LinkServiceToken,
    useFactory: () => makeLinkService(),
} satisfies DIConfig<LinkServiceContract>;
