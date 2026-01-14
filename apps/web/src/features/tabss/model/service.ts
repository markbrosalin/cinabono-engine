// import { createTabsModel, ITab, string } from "@gately/entities/model/tabs";
// import { useEngine } from "@gately/app/providers/EngineProvider";

// export const createTabsService = (store: ReturnType<typeof createTabsModel>) => {
//     const { mutations } = store;
//     const engine = useEngine();

//     async function createTab(args?: Partial<ITab>) {
//         const result = await engine.call("/tab/create", args);

//         const newTab = mutations.createTab({ id: result.tabId });

//         return newTab;
//     }

//     async function removeTab(tabId: string) {
//         await engine.call("/tab/remove", { tabId });

//         const removedTab = mutations.removeTab(tabId);

//         return removedTab;
//     }

//     function openTab(tabId: string) {
//         mutations.setActiveTab(tabId);
//     }

//     return {
//         createTab,
//         removeTab,
//         updateTab: mutations.updateTab,
//         getTab: mutations.getTab,
//         openTab,
//     };
// };
