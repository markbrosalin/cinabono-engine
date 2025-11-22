import { DiConfig, DiToken } from "@di/types";

export interface DIContainerContract {
    register<T extends DiToken>(config: DiConfig<T>): void;
    resolve<T extends DiToken>(token: T): T["__type__"];
    clear(): void;
}
