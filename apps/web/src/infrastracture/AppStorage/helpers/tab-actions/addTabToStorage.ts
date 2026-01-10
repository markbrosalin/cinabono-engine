import { produce } from "solid-js/store";
import { createTabItem } from "../../tabStorageItem.factories";
import { AppStorage } from "../../storage";
import { updateTabToAppStorage } from "./updateTabToStorage";
import { batch } from "solid-js";
import { getTab } from "./getTabFromStorage";

const [, setTabs] = AppStorage.HIERARCHY.data;
const [, SetActiveTabId] = AppStorage.TAB_SETTINGS.data.ActiveTabId;

export const addTempTab = (tempId: string) => {
    batch(() => {
        SetActiveTabId(tempId);
        addTab(tempId);
    });
};

export const finalizeTempTab = (newId: string, tempId: string) => {
    batch(() => {
        if (!getTab(tempId)) {
            addTab(newId);
        } else {
            updateTabToAppStorage(tempId, { tabId: newId, isLoaded: true });
        }
        SetActiveTabId(newId);
    });
};

function addTab(tempId: string) {
    setTabs(
        produce((tabs) => {
            tabs.push(createTabItem(tempId));
        })
    );
}
