import { Accessor, Setter } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { TabSettings, UITabData } from "@gately/infrastracture/AppStorage";
import { TabStatus } from "@gately/domain-model/shared/container-manager/tab/tools/types";

export interface TabsManagerContextValue {
    tabs: UITabData[];
    setTabs: SetStoreFunction<UITabData[]>;

    ActiveTabId: Accessor<string>;
    SetActiveTabId: Setter<string>;

    isTabLoaded: (tab?: UITabData) => boolean;
    getTabStatus: (tab?: UITabData) => TabStatus | undefined;
    updateTabTitle: (tabId: string | undefined, newTitle: string) => void;

    runtimeFlags: TabSettings["runtimeFlags"];
    preferences: TabSettings["preferences"];
    data: TabSettings["data"];
}
