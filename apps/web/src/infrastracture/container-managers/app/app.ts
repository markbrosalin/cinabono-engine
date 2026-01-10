import { ContainerManager } from "../abstract-core/abstract";
import { AppCtxProviderToken } from "@gately/domain-model/shared/di-tokens/app/providers";
import { DIContainerContract, Resolve, DIContainer, DIConfig } from "@repo/di";

export class AppContainerManager extends ContainerManager {
    constructor(configs: DIConfig<unknown>[]) {
        super(configs);
    }

    public async getCtxProvider() {
        return await this.resolve(AppCtxProviderToken);
    }

    protected override async afterInit(): Promise<void> {
        const provider = await this.getCtxProvider();
        provider.warm();
    }

    protected createContainer(parentResolve?: Resolve): DIContainerContract {
        return new DIContainer(parentResolve);
    }
}
