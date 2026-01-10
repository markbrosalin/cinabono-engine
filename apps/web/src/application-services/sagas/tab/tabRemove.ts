import { events } from "@gately/domain-model/shared/event-bus";
import { SagaPayload } from "@gately/domain-model/shared/saga/types";
import { ScopeServiceContract } from "@repo/modules-runtime/scope/contracts";
import { CoreSaga } from "../core/coreSaga";
import { Id } from "@repo/schema";

export class SagaRemoveTab extends CoreSaga<typeof events.RemoveTab> {
    protected override async run({ tabId }: SagaPayload<typeof events.RemoveTab>): Promise<void> {
        const scopeService = await this._getScopeService(tabId);
        await this._removeScope(scopeService, tabId);
        await this._removeTab(tabId);
        await this.emitFinal(events.TabRemoved);
    }

    private async _getScopeService(tabId: Id): Promise<ScopeServiceContract> {
        const tabCtx = await this.getTabContext(tabId);
        return tabCtx.services.scopeService;
    }

    private async _removeScope(scopeService: ScopeServiceContract, tabId: Id): Promise<boolean> {
        return this.step("Remove scope", () => scopeService.store.remove(tabId));
    }

    private async _removeTab(tabId: Id): Promise<boolean> {
        const tabService = (await this.ctx).tabService;
        return this.step("Remove tab", () => tabService.store.remove(tabId));
    }
}
