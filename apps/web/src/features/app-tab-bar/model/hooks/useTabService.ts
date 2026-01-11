import CinabonoEngine from "@gately/cinabono-engine/client";
import { ITab, TabId } from "../types";
import { PartialExcept } from "@cnbn/schema";
import { TabActions } from "@gately/states";

export const useTabService = (actions: TabActions) =>
    ({
        createTab: async (args?: Partial<ITab>) => {
            const result = await CinabonoEngine.call("/tab/create", args);

            const newTab = actions.createTab({ id: result.tabId });

            return newTab;
        },

        removeTab: async (tabId: TabId) => {
            await CinabonoEngine.call("/tab/remove", { tabId });

            const removedTab = actions.removeTab(tabId);

            return removedTab;
        },

        updateTab: (args: PartialExcept<ITab, "id">) => actions.updateTab(args),

        getTab: (tabId: TabId) => actions.getTab(tabId),
    }) as const;
