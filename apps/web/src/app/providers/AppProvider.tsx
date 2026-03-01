import { Accessor, createContext, createSignal, ParentComponent, useContext } from "solid-js";
import { ScopeModelProvider, useScopeContext } from "@gately/entities/model/Scope/ScopeProvider";
import { LogicEngineProvider, useLogicEngine } from "@gately/shared/infrastructure/LogicEngine";
import { UIEngineProvider } from "@gately/shared/infrastructure";

interface IAppContext {
    theme: Accessor<"light" | "dark">;
    toggleTheme: () => void;
}

const AppContext = createContext<IAppContext>();

const UIEngineRuntimeProvider: ParentComponent = (props) => {
    const logicEngine = useLogicEngine();
    const scope = useScopeContext();

    return <UIEngineProvider ctx={{ logicEngine, workspaceSession: scope }}>{props.children}</UIEngineProvider>;
};

export const AppProvider: ParentComponent = (props) => {
    const [theme, setTheme] = createSignal<"light" | "dark">("light");

    const context: IAppContext = {
        theme,
        toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    };

    return (
        <AppContext.Provider value={context}>
            <LogicEngineProvider>
                <ScopeModelProvider>
                    <UIEngineRuntimeProvider>{props.children}</UIEngineRuntimeProvider>
                </ScopeModelProvider>
            </LogicEngineProvider>
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useApp must be used within AppProvider");
    return ctx;
};
