import {
    createContext,
    createEffect,
    createSignal,
    onCleanup,
    ParentComponent,
    useContext,
} from "solid-js";
import { type UIEngineContext as UIEngineRuntimeContext } from ".";
import { UIEngineServices } from "../services";
import { createUIEngine } from "./createUIEngine";

type EngineInstance = ReturnType<typeof createUIEngine>;

interface UIEngineContext {
    setContainer: (container: HTMLDivElement) => void;
    services: () => UIEngineServices | undefined;
}

const UIEngineContext = createContext<UIEngineContext>();

export const UIEngineProvider: ParentComponent<{ ctx?: UIEngineRuntimeContext }> = (props) => {
    const [engine, setEngine] = createSignal<EngineInstance | null>();
    const [container, setContainer] = createSignal<HTMLDivElement>();

    createEffect(() => {
        const c = container();
        if (!c) return;

        const instance = createUIEngine(c, props.ctx ?? {});
        setEngine(instance);

        onCleanup(() => {
            instance.dispose();
            setEngine(null);
        });
    });

    const value: UIEngineContext = {
        setContainer,
        services: () => engine()?.services,
    };

    return <UIEngineContext.Provider value={value}>{props.children}</UIEngineContext.Provider>;
};

export const useUIEngine = () => {
    const ctx = useContext(UIEngineContext);
    if (!ctx) throw new Error("useUIEngine must be used within UIEngineProvider");
    return ctx;
};
