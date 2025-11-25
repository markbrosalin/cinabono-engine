import { DIContainerContract } from "./contracts";
import { DiResolve, DiConfig, DiToken } from "./types";
export declare class DIContainer implements DIContainerContract {
    private readonly _parentResolve?;
    private _regs;
    constructor(_parentResolve?: DiResolve | undefined);
    register(cfg: DiConfig): void;
    resolve<T extends DiToken>(token: T): T["__type__"];
    clear(): void;
}
//# sourceMappingURL=container.d.ts.map