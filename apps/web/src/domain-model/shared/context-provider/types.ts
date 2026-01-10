import { AppCtxProviderContract } from "./app/contracts";
import { TabCtxProviderContract } from "./tab/contracts";

export interface AppAndTabCtxProviders {
    app: AppCtxProviderContract;
    tab: TabCtxProviderContract;
}
