import { events } from "@gately/domain-model/shared/event-bus";
import { Id, TabScope } from "@repo/schema";
import { TabContainerManagerContract } from "@gately/domain-model/shared/container-manager/tab";
import { ScopeServiceContract } from "@repo/modules-runtime/scope/contracts";
import { CoreSaga } from "../core/coreSaga";

export class SagaCreateTab extends CoreSaga<typeof events.CreateTab> {
    protected override async run(): Promise<void> {
        const tempId = await this._emitTempTab();
        const tab = await this._createTab();
        const scopeService = await this._getScopeService(tab);
        const tabScope = await this._createScope(scopeService, tab);
        await this._save(tab, scopeService, tabScope);
        await this.emitFinal(events.RealTabCreated, { readlId: tab.tabId, tempId });
    }

    private async _emitTempTab(): Promise<Id> {
        const eventBus = (await this.ctx).eventBus;
        const tempId = `temp-${Date.now()}`;
        eventBus.emit(events.TempTabCreated, { tempId });
        return tempId;
    }

    private async _createTab(): Promise<TabContainerManagerContract> {
        const tabService = (await this.ctx).tabService;
        return this.step(
            "Create new Tab",
            async () => await tabService.creator.createTabStructure()
        );
    }

    private async _getScopeService(
        tab: TabContainerManagerContract
    ): Promise<ScopeServiceContract> {
        const tabCtx = await this.getTabContext(tab);
        return tabCtx.services.scopeService;
    }

    private async _createScope(
        scopeService: ScopeServiceContract,
        tab: TabContainerManagerContract
    ): Promise<TabScope> {
        return this.step("Create tabScope", () =>
            scopeService.creator.buildScopeStructure({ kind: "TAB", id: tab.tabId })
        );
    }

    private async _save(
        tab: TabContainerManagerContract,
        scopeService: ScopeServiceContract,
        scope: TabScope
    ): Promise<void> {
        const tabService = (await this.ctx).tabService;
        this.step("Saving in stores", () => {
            tabService.store.insert(tab.tabId, tab);
            scopeService.store.insert(tab.tabId, scope);
            return {
                scopes: scopeService.store.entries(),
                tabs: tabService.store.entries(),
            };
        });
    }
}
