import { Component, createSignal, lazy, onMount, Show, Suspense } from "solid-js";
import { AppContainerManager } from "./infrastracture/container-managers/app/app";
import { runtimeConfigs } from "./infrastracture/di-container/configs/runtime/index.config";
import "reflect-metadata";
import { events } from "./domain-model/shared/event-bus";
import { EventBusToken } from "./domain-model/shared/di-tokens/app/infra";
import { AppStorage } from "./infrastracture/AppStorage";
// import {
//     SimulationServiceToken,
//     StructureTemplateHasherFactoryToken,
//     TabServiceToken,
// } from "./domain-model/shared/di-tokens";
// import { templatesMap } from "./infrastracture/di-container/configs/runtime/library/templates";

const MainView = lazy(() => import("./infrastracture/UI/views/MainView"));

// (window as any).AppStorage = AppStorage;

export const App: Component = () => {
    const [containerManager, setContainerManager] = createSignal<AppContainerManager>();

    onMount(async () => {
        document.getElementById("initial-loader")?.remove();

        // Initting container
        const appContainer = new AppContainerManager(runtimeConfigs);
        await appContainer.init();

        // const HasherFactory = await appContainer.resolve(StructureTemplateHasherFactoryToken);
        // const hasher = HasherFactory(
        //     templatesMap.get("8f85ed71d6126840fc481f491e56f37d5e98cd709253708279a21acf90186c25")
        // );
        // console.log(hasher.getStructureData());

        const eventBus = await appContainer.resolve(EventBusToken);

        setTimeout(() => {
            eventBus.emit(events.CreateItem, {
                // hash: "8f85ed71d6126840fc481f491e56f37d5e98cd709253708279a21acf90186c25",
                // hash: "1",
                hash: "3BuffersAndNOT",
                path: [AppStorage.HIERARCHY.data[0][0].tabId],
            });
        }, 1000);

        setContainerManager(appContainer);
    });

    return (
        <Suspense>
            <Show when={containerManager()}>{(manager) => <MainView app={manager()} />}</Show>
        </Suspense>
    );
};
