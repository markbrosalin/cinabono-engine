import { AppStorage } from "../storage";

export const getActiveTabId = () => AppStorage.TAB_SETTINGS.data.ActiveTabId;

export const getTabsStates = () => AppStorage.HIERARCHY.data;
