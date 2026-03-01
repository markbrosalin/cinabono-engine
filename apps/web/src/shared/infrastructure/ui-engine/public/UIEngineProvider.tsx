import {
    createContext,
    createEffect,
    createSignal,
    onCleanup,
    ParentComponent,
    useContext,
} from "solid-js";
import { type UIEngineExternalContext } from ".";
import { createWorkspaceSession } from "../components/workspace-session";
import { createUIEngineCommandFacade } from "./createUIEngineCommandFacade";
import { createUIEngine } from "./createUIEngine";
import type { UIEnginePublicApi } from "./types";

type EngineInstance = ReturnType<typeof createUIEngine>;

const FALLBACK_DEBUG: UIEnginePublicApi["debug"] = {
    graph: () => undefined,
};

const UIEngineContext = createContext<UIEnginePublicApi>();

export const UIEngineProvider: ParentComponent<{ ctx?: UIEngineExternalContext }> = (props) => {
    const [engine, setEngine] = createSignal<EngineInstance | null>();
    const [container, setContainer] = createSignal<HTMLDivElement>();
    const workspaceSession =
        props.ctx?.logicEngine && props.ctx.workspaceSession
            ? createWorkspaceSession({
                  logicEngine: props.ctx.logicEngine,
                  workspace: props.ctx.workspaceSession,
                  getRuntimeSnapshotApi: () => engine()?.commands,
              })
            : undefined;

    const getRequiredEngine = (): EngineInstance => {
        const instance = engine();
        if (!instance) {
            throw new Error("[UIEngine] engine is not ready");
        }
        return instance;
    };

    createEffect(() => {
        const c = container();
        if (!c) return;

        const instance = createUIEngine(c, props.ctx ?? {});
        setEngine(instance);
        workspaceSession?.syncRuntimeSnapshot();

        onCleanup(() => {
            instance.dispose();
            setEngine(null);
        });
    });

    const commands = createUIEngineCommandFacade({
        workspace: workspaceSession,
        getRuntime: () => getRequiredEngine().commands,
    });

    const value: UIEnginePublicApi = {
        mount: {
            setContainer,
        },
        state: {
            ready: () => Boolean(engine()),
            selectionCount: () => engine()?.debug.graph()?.getSelectedCellCount?.() ?? 0,
        },
        commands,
        get debug() {
            return engine()?.debug ?? FALLBACK_DEBUG;
        },
    };

    return <UIEngineContext.Provider value={value}>{props.children}</UIEngineContext.Provider>;
};

export const useUIEngine = () => {
    const ctx = useContext(UIEngineContext);
    if (!ctx) throw new Error("useUIEngine must be used within UIEngineProvider");
    return ctx;
};
