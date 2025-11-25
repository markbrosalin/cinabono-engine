import { TabContract } from "./tab";
import { TabCtx } from "./types";
import { Id } from "@cnbn/schema";
export interface TabCreatorContract {
    create(deps: TabCtx, tabId?: Id): TabContract;
}
export declare class DefaultTabCreator implements TabCreatorContract {
    create(deps: TabCtx, tabId?: Id): TabContract;
}
//# sourceMappingURL=creator.d.ts.map