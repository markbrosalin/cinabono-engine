import { Accessor, createContext, ParentComponent, useContext } from "solid-js";
import { createScopeManager, ScopeManager } from "./ScopeManager";
import { createStore } from "solid-js/store";
import { ScopeStore } from "./types";
import { createTabService, TabService } from "./TabService";
import { CircuitService, createCircuitService } from "./CircuitService";

interface ScopeModelContext
    extends CircuitService,
        TabService,
        Pick<ScopeManager, "setActiveScope" | "hasScope" | "getScope"> {
    activeScopeId: Accessor<string | undefined>;
}

const ScopeModelContext = createContext<ScopeModelContext>();

export const ScopeModelProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore<ScopeStore>({
        scopes: {},
        activeScopeId: undefined,
    });

    const scopeManager = createScopeManager(store, setStore);
    const { orderedTabs, addTab, removeTab } = createTabService(scopeManager);
    const { addCircuit } = createCircuitService(scopeManager);

    const { setActiveScope, getScope, hasScope } = scopeManager;
    const activeScopeId = () => store.activeScopeId;

    const value = {
        setActiveScope,
        addCircuit,
        addTab,
        getScope,
        hasScope,
        activeScopeId,
        orderedTabs,
        removeTab,
    };

    return <ScopeModelContext.Provider value={value}>{props.children}</ScopeModelContext.Provider>;
};

export const useScopeContext = () => {
    const ctx = useContext(ScopeModelContext);
    if (!ctx) throw new Error("useScopeContext must be used within a ScopeModelContext");
    return ctx;
};
