import { Component, onMount, Suspense } from "solid-js";
import "reflect-metadata";
import { AppProvider } from "./providers/AppProvider";
import { TabBar } from "@gately/widgets/TabBar";
import { Workspace } from "@gately/widgets/Workspace/";
import "../shared/infrastructure/cinabono-engine/client";

// const MainView = lazy(() => import("./infrastracture/UI/views/MainView"));

export const App: Component = () => {
    onMount(async () => {
        document.getElementById("initial-loader")?.remove();
    });

    return (
        <Suspense>
            <AppProvider>
                <TabBar />
                <Workspace />
            </AppProvider>
        </Suspense>
    );
};
