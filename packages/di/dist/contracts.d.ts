import { DiConfig, DiToken } from "./types";
export interface DIContainerContract {
    register<T extends DiToken>(config: DiConfig<T>): void;
    resolve<T extends DiToken>(token: T): T["__type__"];
    clear(): void;
}
//# sourceMappingURL=contracts.d.ts.map