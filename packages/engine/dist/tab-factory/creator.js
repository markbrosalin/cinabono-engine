import { DefaultTab } from "./tab";
import { uniqueId } from "@cnbn/utils";
export class DefaultTabCreator {
    create(deps, tabId) {
        return new DefaultTab(deps, tabId ?? uniqueId());
    }
}
