import { TabContract } from "./tab.js";
import { TabCtx } from "./types.js";
import { Id } from "@cnbn/schema";
export interface TabCreatorContract {
    create(deps: TabCtx, tabId?: Id): TabContract;
}
export declare class DefaultTabCreator implements TabCreatorContract {
    create(deps: TabCtx, tabId?: Id): TabContract;
}
//# sourceMappingURL=creator.d.ts.map