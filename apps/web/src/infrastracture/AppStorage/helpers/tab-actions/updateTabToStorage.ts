import { AppStorage } from "../../storage";
import { UITabData } from "../../types";

const [_, setTabs] = AppStorage.HIERARCHY.data;

export function updateTabToAppStorage(tabId: string, fields: Partial<UITabData>) {
    setTabs((t) => t.tabId === tabId, fields);
}
