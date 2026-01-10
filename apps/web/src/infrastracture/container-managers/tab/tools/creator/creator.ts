import { DIConfig, Resolve } from "@repo/di/types";
import { TabContainerManager } from "../../tab";
import {
    TabCreatorContract,
    TabContainerManagerContract,
} from "@gately/domain-model/shared/container-manager/tab";

type TabConstructor = new (
    ...args: ConstructorParameters<typeof TabContainerManager>
) => TabContainerManagerContract;

interface ConstructorType {
    TabContainerManager: TabConstructor;
    configs: ConstructorParameters<TabConstructor>[0];
    parentResolver: ConstructorParameters<TabConstructor>[1];
}

export class TabCreatorTool implements TabCreatorContract {
    private readonly _TabContainerManager: TabConstructor;
    private readonly _configs: DIConfig<unknown>[];
    private readonly _parentResolver: Resolve;

    constructor({ TabContainerManager, configs, parentResolver }: ConstructorType) {
        this._TabContainerManager = TabContainerManager;
        this._configs = configs;
        this._parentResolver = parentResolver;
    }

    public async createTabStructure(): Promise<TabContainerManagerContract> {
        const tab = new this._TabContainerManager(this._configs, this._parentResolver);

        await tab.init();
        await tab.ready();
        return tab;
    }
}
