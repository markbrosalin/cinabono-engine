import { Component, createContext, createEffect, JSX, onCleanup } from "solid-js";
import {
    AppStorage,
    getActiveTabId,
    getTabsStates,
    removeTabFromAppStorage,
    UITabData,
    updateTabToAppStorage,
    addTempTab,
    finalizeTempTab,
} from "@gately/infrastracture/AppStorage";
import { TabsManagerContextValue } from "./types";
import { events } from "@gately/domain-model/shared/event-bus";
import { useSafeEventBus } from "../di-context/getSafeEventBus";

export const TabsManagerContext = createContext<TabsManagerContextValue>();

export const TabsManagerContextProvider: Component<{ children: JSX.Element }> = (props) => {
    const { runtimeFlags, preferences, data } = AppStorage.TAB_SETTINGS;
    const [ActiveTabId, SetActiveTabId] = getActiveTabId();
    const [tabs, setTabs] = getTabsStates();

    const { eventBus } = useSafeEventBus();

    const getTabStatus = (tab?: UITabData) => tab?.status ?? undefined;
    const isTabLoaded = (tab?: UITabData) => tab?.isLoaded ?? false;

    createEffect(initializeBusEvents);
    createEffect(createFirstTab);

    function initializeBusEvents() {
        const offTempTabCreated = eventBus()?.on(events.TempTabCreated, ({ tempId }) =>
            addTempTab(tempId)
        );

        const offRealTabCreated = eventBus()?.on(
            events.RealTabCreated,
            ({ readlId: newId, tempId }) => finalizeTempTab(newId, tempId)
        );

        const offChangeActiveTab = eventBus()?.on(events.ChangeActiveTab, ({ tabId }) => {
            if (tabId) SetActiveTabId(tabId);
        });

        const offRemoveTab = eventBus()?.on(events.RemoveTab, ({ tabId }) => {
            if (tabId) removeTabFromAppStorage(tabId);
        });

        onCleanup(() => {
            offTempTabCreated?.();
            offRealTabCreated?.();
            offChangeActiveTab?.();
            offRemoveTab?.();
        });
    }

    function createFirstTab() {
        if (Object.keys(tabs).length === 0) {
            eventBus()?.emit(events.CreateTab);
        }
    }

    const updateTabTitle = (tabId: string | undefined, newTitle: string) => {
        if (tabId) updateTabToAppStorage(tabId, { title: newTitle });
    };

    const value = {
        tabs,
        setTabs,

        ActiveTabId,
        SetActiveTabId,

        data,
        runtimeFlags,
        preferences,

        updateTabTitle,
        isTabLoaded,
        getTabStatus,
    };

    return (
        <TabsManagerContext.Provider value={value}>{props.children}</TabsManagerContext.Provider>
    );
};
