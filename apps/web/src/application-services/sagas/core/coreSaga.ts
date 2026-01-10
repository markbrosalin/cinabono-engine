import type { AppCtxProviderContract } from "@gately/domain-model/shared/context-provider/app/contracts";
import type { LoggerContract } from "@gately/domain-model/shared/error-logger";
import { LoggerToken } from "@gately/domain-model/shared/di-tokens/app/infra";
import { SagaContext } from "@gately/domain-model/shared/saga/types";
import { inject } from "@repo/di";
import { AppCtxProviderToken } from "@gately/domain-model/shared/di-tokens/app/providers";
import { EventName, EventPayloads } from "@gately/domain-model/shared/event-bus";
import { TabCtx } from "@gately/domain-model/shared/context-provider/tab/types";
import { createTabCtx } from "@gately/domain-model/shared/context-provider/tab/helpers";
import { TabContainerManagerContract } from "@gately/domain-model/shared/container-manager/tab";
import { Id } from "@repo/schema/shared";
import { SagaContract } from "@gately/domain-model/shared/saga/contract";

export abstract class CoreSaga<E extends EventName> extends SagaContract<E> {
    constructor(
        @inject(LoggerToken) protected readonly logger: LoggerContract,
        @inject(AppCtxProviderToken) protected readonly app: AppCtxProviderContract
    ) {
        super(logger);
    }

    protected async buildContext(): Promise<SagaContext> {
        const appCtx = await this.app.get();

        return {
            appCtx,
            tabService: appCtx.services.tabService,
            eventBus: appCtx.infra.eventBus,
        };
    }

    protected async getTab(tabId: Id): Promise<TabContainerManagerContract> {
        const tabService = (await this.ctx).tabService;
        return this.step("Get tab from store", () => tabService.store.getSafely(tabId));
    }

    protected getTabContext(tabData: Id | TabContainerManagerContract): Promise<TabCtx> {
        return this.step("Get tab context", async () => {
            const tab =
                typeof tabData === "string"
                    ? (await this.ctx).tabService.store.getSafely(tabData)
                    : tabData;

            return await createTabCtx(tab);
        });
    }

    protected async emitFinal<E extends EventName>(
        event: E,
        payload?: EventPayloads[E]
    ): Promise<void> {
        const eventBus = (await this.ctx).eventBus;
        eventBus.emit(event, payload);
    }
}
