import {
    Accessor,
    createContext,
    createEffect,
    createSignal,
    ParentComponent,
    useContext,
} from "solid-js";
import { Graph } from "@antv/x6";
import { registerGraph } from "./register/Graph";

interface UIEngineContext {
    setContainer: (container: HTMLDivElement) => void;
    graph: Accessor<Graph | undefined>;
}

const UIEngineContext = createContext<UIEngineContext>();

export const UIEngineProvider: ParentComponent = (props) => {
    const init = (container: HTMLDivElement) => {
        const graph = registerGraph(container);
        setGraph(graph);
    };

    const [graph, setGraph] = createSignal<Graph | undefined>();
    const [container, setContainer] = createSignal<HTMLDivElement>();

    createEffect(() => {
        const c = container();
        if (c) init(c);
    });

    const value: UIEngineContext = {
        setContainer,
        graph,
    };

    return <UIEngineContext.Provider value={value}>{props.children}</UIEngineContext.Provider>;
};

export const useUIEngine = () => {
    const ctx = useContext(UIEngineContext);
    if (!ctx) throw new Error("useUIEngine must be used within UIEngineProvider");
    return ctx;
};
