import { ContainerManager } from "../abstract-core/abstract";
import { v4 as uuidv4 } from "uuid";
import { TabContainerManagerContract } from "@gately/domain-model/shared/container-manager/tab/contracts";
import { CurrentTabIdToken } from "@gately/domain-model/shared/di-tokens/tab/values";
import { TabCtxProviderToken } from "@gately/domain-model/shared/di-tokens/tab/provider";
import { DIContainerContract, Resolve, DIContainer, DIConfig } from "@repo/di";
import { Id } from "@repo/schema";

export class TabContainerManager extends ContainerManager implements TabContainerManagerContract {
    private _tabId = uuidv4();

    constructor(configs: DIConfig<unknown>[], _parentResolver: Resolve) {
        super(configs, _parentResolver);
    }

    public get tabId(): string {
        return this._tabId;
    }

    public async getCtxProvider() {
        return await this.resolve(TabCtxProviderToken);
    }

    public async kill(): Promise<void> {
        this.container.clear();
    }

    protected override async afterInit(): Promise<void> {
        const provider = await this.getCtxProvider();
        provider.warm();
    }

    protected createContainer(parentResolve?: Resolve): DIContainerContract {
        const container = new DIContainer(parentResolve);
        this._registerTab(container, this.tabId);
        return container;
    }

    private _registerTab(c: DIContainerContract, tabId: Id) {
        c.register({ token: CurrentTabIdToken, lifetime: "transient", useValue: tabId });
    }
}
