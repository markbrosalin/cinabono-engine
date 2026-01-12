import { ITab } from "@gately/shared/states";
import { Component, createContext, JSX } from "solid-js";

export interface ITabContext extends ITab {}

export const TabContext = createContext<ITabContext>();

export const TabContextProvider: Component<{ tab: ITab; children: JSX.Element }> = (props) => {
    const context: ITabContext = { ...props.tab };

    return <TabContext.Provider value={context}>{props.children}</TabContext.Provider>;
};
