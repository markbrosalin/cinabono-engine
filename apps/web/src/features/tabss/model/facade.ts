// import { createTabsModel, ITab, string } from "@gately/entities/model/tabs";
// import { createTabsService } from "./service";

// export const createTabsFacade = (store: ReturnType<typeof createTabsModel>) => {
//     const { state } = store;
//     const service = createTabsService(store);

//     function canRemoveTab(tabId: string, conditions?: { isEditing?: boolean }): boolean {
//         // can't remove last tab
//         if (state.tabs.length <= 1) return false;

//         // can't remove unknown tab
//         if (!state.tabs.some((t) => t.id === tabId)) return false;

//         // can't remove tab while editing
//         if (conditions?.isEditing) return false;

//         return true;
//     }

//     async function removeTab(tabId: string, conditions?: { isEditing?: boolean }) {
//         if (!canRemoveTab(tabId, conditions)) {
//             throw new Error(`Cannot remove tab ${tabId}`);
//         }
//         const removedTab = await service.removeTab(tabId);

//         if (!removedTab) return;
//     }

//     async function createTab(args?: Partial<ITab>) {
//         const newTab = await service.createTab(args);

//         service.openTab(newTab.id);

//         return newTab;
//     }

//     return {
//         get tabs() {
//             return state.tabs;
//         },
//         get activeTab() {
//             return state.activeTab;
//         },
//         ...service,
//         canRemoveTab,
//         removeTab,
//         createTab,
//     };
// };

// export type TabsFacade = ReturnType<typeof createTabsFacade>;
