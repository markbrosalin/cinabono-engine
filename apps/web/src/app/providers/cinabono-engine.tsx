import { CinabonoClient } from "@cnbn/engine-worker";
import { createEngineClient } from "@gately/shared/infrastructure/cinabono-engine";
import { Component, createContext, createResource, JSX, Show, useContext } from "solid-js";

const EngineContext = createContext<CinabonoClient>();

export const EngineProvider: Component<{ children: JSX.Element }> = (props) => {
    const [engine] = createResource(() => createEngineClient());

    return (
        <Show when={engine()} fallback={<div>Loading engine...</div>}>
            <EngineContext.Provider value={engine()}>{props.children}</EngineContext.Provider>
        </Show>
    );
};

export const useEngine = () => {
    const ctx = useContext(EngineContext);
    if (!ctx) throw new Error("useEngine must be used within EngineProvider");
    return ctx;
};
