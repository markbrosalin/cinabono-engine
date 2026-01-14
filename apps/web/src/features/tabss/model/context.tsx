// import { Component, createContext, createMemo, JSX, useContext } from "solid-js";
// import { createTabsModel } from "@gately/entities/model/tabs";
// import { TabsFacade, createTabsFacade } from "./facade";

// const TabsContext = createContext<TabsFacade>();

// export const TabsProvider: Component<{ children: JSX.Element }> = (props) => {
//     const store = createMemo(() => createTabsModel());
//     const facade = createMemo(() => createTabsFacade(store()));

//     return <TabsContext.Provider value={facade()}>{props.children}</TabsContext.Provider>;
// };

// export const useTabs = () => {
//     const ctx = useContext(TabsContext);
//     if (!ctx) throw new Error("useTabs must be used within a TabsProvider");
//     return ctx;
// };
