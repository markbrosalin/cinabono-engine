import { Component, lazy } from "solid-js";
import { ContainerProvider } from "../shared/context/di-context/context";
import { TabsManagerContextProvider } from "../shared/context/tab-manager-context/context";
import { AppContainerManager } from "@gately/infrastracture/container-managers/app/app";

const WorkspaceWrapper = lazy(() => import("../widgets/ui/WorkspaceWrapper"));
const Header = lazy(() => import("../widgets/ui/Header"));

const MainView: Component<{ app: AppContainerManager }> = (props) => {
    return (
        <>
            <ContainerProvider app={props.app}>
                <TabsManagerContextProvider>
                    <div class="flex h-screen flex-col">
                        <Header class="z-1" />
                        <WorkspaceWrapper class="z-0" />
                    </div>
                </TabsManagerContextProvider>
            </ContainerProvider>
        </>
    );
};

export default MainView;
