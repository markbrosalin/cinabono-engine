import { report } from "@gately/infrastracture/di-container/configs/runtime/logger.config";
import { events } from "@gately/domain-model/shared/event-bus";
import {
    BuildArgs,
    ItemBuilderContract,
    ItemBuildResult,
} from "@gately/domain-model/shared/item-builder";
import { TabCtx } from "@gately/domain-model/shared/context-provider/tab/types";
import { getBuiltItem } from "@gately/application-services/itemBuilder/helpers/helpers";
import { CoreSaga } from "../core/coreSaga";
import { getTabIdFromPath, getScopeIdFromPath } from "@repo/helpers";
import { isCustomItem } from "@repo/schema";
import { SagaPayload } from "@gately/domain-model/shared/saga/types";

export class SagaCreateItem extends CoreSaga<typeof events.CreateItem> {
    protected override async run(payload: SagaPayload<typeof events.CreateItem>): Promise<void> {
        const tabCtx = await this.getTabContext(getTabIdFromPath(payload.path));
        const itemBuiler = await this._initItemBuilder(tabCtx);
        const builtData = await this._buildItem(itemBuiler, payload);

        await this._registerToParentScope(tabCtx, builtData.items);
        await this._storeBuiltData(tabCtx, builtData);
        await this.emitFinal(events.ItemCreated, { result: builtData });
        console.log(JSON.stringify(Array.from(builtData.scopes[0].storedItems.entries())));
    }

    private _initItemBuilder(tabCtx: TabCtx): Promise<ItemBuilderContract> {
        return this.step("Init builder", async () => {
            const { appCtx } = await this.ctx;
            const { itemService, scopeService } = tabCtx.services;

            return appCtx.tools.itemBuilderFactory({
                libraryStore: appCtx.services.libraryService.store,
                itemCreationTool: itemService.creator,
                scopeCreationTool: scopeService.creator,
                scopeMutationTool: scopeService.mutator,
            });
        });
    }

    private _buildItem(builder: ItemBuilderContract, payload: BuildArgs): Promise<ItemBuildResult> {
        return this.step("Build item", async () => {
            const buildData = await builder.build(payload);
            this._validateBuildData(buildData);
            return buildData;
        });
    }

    private _validateBuildData(data: ItemBuildResult): void {
        if (!data) throw report.fatal("[SagaCreateItem] BuildData is undefined");

        if (!data.items.length)
            throw new Error("Ошибка формирования элемента. Массив элементов пуст");

        const builtItem = getBuiltItem(data.items);
        if (data.items.length === 1 && isCustomItem(builtItem))
            throw new Error("Ошибка формирования элемента. Кастомный элемент Не может быть пустым");
    }

    private _registerToParentScope(tabCtx: TabCtx, data: ItemBuildResult["items"]) {
        const { scopeService } = tabCtx.services;

        return this.step(
            "Register item to parent scope",
            () => {
                const builtItem = getBuiltItem(data);
                const parentId = getScopeIdFromPath(builtItem.path);
                const parentScope = scopeService.store.getSafely(parentId);

                scopeService.mutator.storeChildItem(builtItem, parentScope);
                scopeService.mutator.storeScopeId(builtItem, parentScope);

                return { builtItem, parentScope };
            },
            ({ builtItem, parentScope }) => {
                scopeService.mutator.removeStoredChildItem(builtItem, parentScope);
                scopeService.mutator.removeStoredScopeId(builtItem, parentScope);

                return { parentScope };
            }
        );
    }

    private _storeBuiltData(tabCtx: TabCtx, data: ItemBuildResult) {
        return this.step("Store built data", () => {
            insertToMultipleStores(data, tabCtx.stores);

            return {
                items: tabCtx.stores.items.entries(),
                scopes: tabCtx.stores.scopes.entries(),
                links: tabCtx.stores.links.entries(),
            };
        });
    }
}
