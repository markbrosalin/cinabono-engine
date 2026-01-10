import { AppContainerManager } from "@gately/infrastracture/container-managers/app/app";
import { Component, JSX, createContext } from "solid-js";

export const containerContext = createContext<AppContainerManager>();

interface ContainerProviderProps {
    children: JSX.Element;
    app: AppContainerManager;
}

export const ContainerProvider: Component<ContainerProviderProps> = (props) => {
    return (
        <containerContext.Provider value={props.app}>{props.children}</containerContext.Provider>
    );
};
