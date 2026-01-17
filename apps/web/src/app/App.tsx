import { Component, onMount } from "solid-js";
import "reflect-metadata";
// import { AppProvider } from "./providers/AppProvider";
// import { TabBar } from "@gately/widgets/TabBar";
// import { Workspace } from "@gately/widgets/Workspace/";
import "../shared/infrastructure/cinabono-engine/client";

export const App: Component = () => {
    onMount(async () => {
        document.getElementById("initial-loader")?.remove();
    });

    return (
        // <AppProvider>
        //     <TabBar />
        //     <Workspace />
        // </AppProvider>
        <div>Привет </div>
    );
};
