import { TabCtxProviderContract } from "../../context-provider/tab/contracts";
import { ContainerManagerContract } from "../core/contracts";

export interface TabContainerManagerContract extends ContainerManagerContract {
    get tabId(): string;

    kill(): void;

    getCtxProvider(): Promise<TabCtxProviderContract>;
}
