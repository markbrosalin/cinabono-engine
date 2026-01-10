// Хелперы
export * from "./preferences/getPreferences";

// Tab actions
export { addTempTab, finalizeTempTab } from "./tab-actions/addTabToStorage";
export { getTabIndex, getTab } from "./tab-actions/getTabFromStorage";
export { removeTabFromAppStorage } from "./tab-actions/removeTabFromStorage";
export { updateTabToAppStorage } from "./tab-actions/updateTabToStorage";
