import { TabCreatorTool } from "@gately/infrastracture/container-managers/tab/tools/creator/creator";
import { itemServiceConfig } from "./item.config";
import { TabService } from "@gately/domain-services/tabService";
import { linkServiceConfig } from "./link.config";
import { TabServiceContract, TabStore } from "@gately/domain-model/shared/container-manager/tab";
import { DIConfig } from "@repo/di/types";
import { TabServiceToken } from "@gately/domain-model/shared/di-tokens/app/services";
import { scopeServiceConfig } from "./scope.config";
import { tabCtxProviderConfig } from "./ctx-providers/tab.config";
import { simulationServiceConfig } from "./simulation/simulation.config";
import { TabContainerManager } from "@gately/infrastracture/container-managers/tab/tab";

export const tabServiceConfig = {
    token: TabServiceToken,
    useFactory: (resolver) =>
        new TabService({
            store: new TabStore(new Map()),
            tools: {
                CREATOR: new TabCreatorTool({
                    TabContainerManager,
                    parentResolver: resolver,
                    configs: [
                        tabCtxProviderConfig,
                        itemServiceConfig,
                        linkServiceConfig,
                        scopeServiceConfig,
                        simulationServiceConfig,
                    ],
                }),
            },
        }),
} satisfies DIConfig<TabServiceContract>;
