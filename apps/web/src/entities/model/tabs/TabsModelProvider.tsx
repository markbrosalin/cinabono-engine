import { Component, createContext, createMemo, JSX, useContext } from "solid-js";
import { createTabsModel, TabsModel } from "./model";

const TabsModelContext = createContext<TabsModel>();

export const TabsModelProvider: Component<{ children: JSX.Element }> = (props) => {
    const model = createMemo(() => createTabsModel());

    return <TabsModelContext.Provider value={model()}>{props.children}</TabsModelContext.Provider>;
};

export const useTabsModel = () => {
    const ctx = useContext(TabsModelContext);
    if (!ctx) throw new Error("useTabsModel must be used within a TabsModelProvider");
    return ctx;
};
