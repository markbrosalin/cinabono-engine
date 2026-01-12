import { Component, onMount, Show, Suspense } from "solid-js";
import "reflect-metadata";
import { AppStates } from "./shared/states";
import "./cinabono-engine/client";
import { AppTabsContextProvider } from "./shared/contexts/appTabsContext";
import AppTabBar from "./features/app-tab-bar/ui/TabBar";

// const MainView = lazy(() => import("./infrastracture/UI/views/MainView"));

export const App: Component = () => {
    onMount(async () => {
        document.getElementById("initial-loader")?.remove();
    });

    return (
        <Suspense>
            <Show when={AppStates.isEngineReady()}>
                <AppTabsContextProvider>
                    <AppTabBar />
                </AppTabsContextProvider>
            </Show>
        </Suspense>
    );
};
