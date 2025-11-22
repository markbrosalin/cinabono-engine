import { DefaultTab, TabContract } from "./tab";
import { uniqueId } from "@cnbn/utils";
import { TabCtx } from "./types";
import { Id } from "@cnbn/schema";

export interface TabCreatorContract {
    create(deps: TabCtx, tabId?: Id): TabContract;
}

export class DefaultTabCreator implements TabCreatorContract {
    create(deps: TabCtx, tabId?: Id): TabContract {
        return new DefaultTab(deps, tabId ?? uniqueId());
    }
}
