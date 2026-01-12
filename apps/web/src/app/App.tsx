import { Component, onMount, Suspense } from "solid-js";
import { TabsProvider } from "../features/tabs/model/context";
import "reflect-metadata";
import "../shared/infrastructure/cinabono-engine/client";
import { EngineProvider } from "./providers/cinabono-engine";
import { AppProvider } from "./providers/app-context";
import TabBar from "@gately/widgets/TabBar/TabBar";

// const MainView = lazy(() => import("./infrastracture/UI/views/MainView"));

export const App: Component = () => {
    onMount(async () => {
        document.getElementById("initial-loader")?.remove();
    });

    return (
        <Suspense>
            <AppProvider>
                <EngineProvider>
                    <TabsProvider>
                        <TabBar />
                    </TabsProvider>
                </EngineProvider>
            </AppProvider>
        </Suspense>
    );
};
