import { Accessor, createContext, ParentComponent, useContext } from "solid-js";
import { createScopeManager, ScopeManager } from "./ScopeManager";
import { createStore } from "solid-js/store";
import { ScopeStore } from "./types";
import { createTabService, TabService } from "./TabService";
import { CircuitService, createCircuitService } from "./CircuitService";
import { createTabSessionService, TabSessionService } from "./TabSessionService";

interface ScopeModelContext
    extends CircuitService,
        TabSessionService,
        TabService,
        Pick<ScopeManager, "setActiveScope" | "hasScope" | "getScope" | "updateScope"> {
    activeScopeId: Accessor<string | undefined>;
} 

const ScopeModelContext = createContext<ScopeModelContext>();

export const ScopeModelProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore<ScopeStore>({
        scopes: {},
        tabSessions: {},
        activeScopeId: undefined,
        activeTabId: undefined,
    });

    const scopeManager = createScopeManager(store, setStore);
    const { orderedTabs, addTab, removeTab, lastTabId } = createTabService(scopeManager);
    const { addCircuit } = createCircuitService(scopeManager);
    const tabSessions = createTabSessionService(store, setStore);

    const { setActiveScope, getScope, hasScope, updateScope } = scopeManager;
    const activeScopeId = () => store.activeScopeId;

    const value = {
        setActiveScope,
        addCircuit,
        addTab,
        getScope,
        hasScope,
        updateScope,
        activeScopeId,
        ...tabSessions,
        orderedTabs,
        removeTab,
        lastTabId,
    };

    return <ScopeModelContext.Provider value={value}>{props.children}</ScopeModelContext.Provider>;
};

export const useScopeContext = () => {
    const ctx = useContext(ScopeModelContext);
    if (!ctx) throw new Error("useScopeContext must be used within a ScopeModelContext");
    return ctx;
};
