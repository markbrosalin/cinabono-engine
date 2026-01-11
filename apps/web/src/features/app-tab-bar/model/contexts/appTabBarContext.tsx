import { Component, createContext, createMemo, JSX } from "solid-js";
import { useTabService } from "../hooks/useTabService";
import { TabBarState } from "../types";
import { createTabStore } from "../stores/tab-store";
import { AppTabBarScrollController, useAppTabBarScroll } from "../hooks/useAppTabBarScroll";

export interface IAppTabBarContext extends ReturnType<typeof useTabService>, TabBarState {
    scroll: AppTabBarScrollController;
}

export const AppTabBarContext = createContext<IAppTabBarContext>();

export const AppTabBarContextProvider: Component<{ children: JSX.Element }> = (props) => {
    const store = createMemo(() => createTabStore());
    const service = createMemo(() => useTabService(store().actions));
    const scroll = useAppTabBarScroll({ step: 250, wheelFactor: 0.4 });

    const context: IAppTabBarContext = {
        ...service(),
        tabs: store().state.tabs,
        scroll,
    };

    return <AppTabBarContext.Provider value={context}>{props.children}</AppTabBarContext.Provider>;
};
