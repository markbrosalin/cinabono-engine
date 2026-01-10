import { ContainerManagerContract } from "@gately/domain-model/shared/container-manager/core/contracts";
import { DIConfig, DIContainerContract, Resolve, Token } from "@repo/di";

export abstract class ContainerManager implements ContainerManagerContract {
    protected _container!: DIContainerContract;

    private _state: "idle" | "initing" | "ready" | "failed" = "idle";
    private _initPromise: Promise<void> | null = null;

    constructor(
        protected readonly _configs: DIConfig<unknown>[],
        private readonly _parentResolve?: Resolve
    ) {}

    protected get container(): DIContainerContract {
        if (!this._container) throw new Error("Container not ready yet");
        return this._container;
    }

    public async resolve<T>(token: Token<T>): Promise<T> {
        await this.ready();
        return this.container.resolve(token);
    }

    public async init(): Promise<void> {
        await this.ready();
        await this.afterInit();
    }

    public async ready(): Promise<void> {
        if (this._state === "ready") return;
        if (this._initPromise) return this._initPromise;

        this._state = "initing";
        this._initPromise = (async () => {
            try {
                await this._doInit();
                this._state = "ready";
            } catch (err) {
                this._state = "failed";
                this._initPromise = null;
                throw err;
            }
        })();

        return this._initPromise;
    }

    private async _doInit(): Promise<void> {
        this._container = this.createContainer(this._parentResolve);
        for (const cfg of this._configs) this._container.register(cfg);
    }

    protected abstract createContainer(parentResolve?: Resolve): DIContainerContract;

    protected async afterInit(): Promise<void> {}
}
