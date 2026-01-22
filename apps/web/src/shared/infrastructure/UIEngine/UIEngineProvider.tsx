import { createContext, createEffect, createSignal, ParentComponent, useContext } from "solid-js";
import { Graph } from "@antv/x6";
import { registerGraph } from "./register/Graph";
import { SnapshotService, useSnapshotService } from "./services/snapshot";
import { useGraphService, type GraphService } from "./services/graph";
import { usePortService, type PortService } from "./services/ports";
import { UIScopeSnapshot } from "./types";

interface UIEngineContext extends SnapshotService, GraphService, PortService {
    setContainer: (container: HTMLDivElement) => void;
}

const UIEngineContext = createContext<UIEngineContext>();

export const UIEngineProvider: ParentComponent = (props) => {
    const [graph, setGraph] = createSignal<Graph | undefined>();
    const [container, setContainer] = createSignal<HTMLDivElement>();
    const [pendingSnapshot, setPendingSnapshot] = createSignal<UIScopeSnapshot | null>(null);

    const init = (container: HTMLDivElement) => {
        const graph = registerGraph(container);
        setGraph(graph);
    };

    createEffect(() => {
        const c = container();
        if (c) init(c);
    });

    const snapshot = useSnapshotService({
        graph,
        pendingSnapshot,
        setPendingSnapshot,
    });
    const graphService = useGraphService(graph);
    const portService = usePortService(graph);

    const value: UIEngineContext = {
        setContainer,
        ...snapshot,
        ...graphService,
        ...portService,
    };

    return <UIEngineContext.Provider value={value}>{props.children}</UIEngineContext.Provider>;
};

export const useUIEngine = () => {
    const ctx = useContext(UIEngineContext);
    if (!ctx) throw new Error("useUIEngine must be used within UIEngineProvider");
    return ctx;
};
