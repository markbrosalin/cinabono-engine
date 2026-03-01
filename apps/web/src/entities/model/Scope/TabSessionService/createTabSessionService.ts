import { produce, SetStoreFunction } from "solid-js/store";
import type { ScopeStore, TabSessionMetadata, TabSessionModel } from "../types";

export type TabSessionService = ReturnType<typeof createTabSessionService>;

const DEFAULT_SIMULATION_STATE: TabSessionModel["simulation"] = {
    mode: "instant",
    status: "idle",
};

const DEFAULT_SETTINGS: TabSessionModel["settings"] = {
    preserveSimulationOnNavigate: true,
};

export const createTabSessionService = (
    store: ScopeStore,
    setStore: SetStoreFunction<ScopeStore>,
) => {
    const activeTabId = () => store.activeTabId;

    const getTabSession = (tabId: string): TabSessionModel | undefined => {
        return store.tabSessions[tabId];
    };

    const hasTabSession = (tabId: string): boolean => {
        return !!getTabSession(tabId);
    };

    const createTabSession = (data: TabSessionMetadata): TabSessionModel => {
        const existing = getTabSession(data.tabId);
        if (existing) {
            return existing;
        }

        const session: TabSessionModel = {
            tabId: data.tabId,
            rootScopeId: data.rootScopeId,
            navigationPath: data.navigationPath ?? [data.rootScopeId],
            simulation: {
                ...DEFAULT_SIMULATION_STATE,
                ...data.simulation,
            },
            settings: {
                ...DEFAULT_SETTINGS,
                ...data.settings,
            },
            _createdAt: Date.now(),
        };

        setStore("tabSessions", session.tabId, session);

        if (data.options?.setActive) {
            setActiveTab(session.tabId);
        }

        return session;
    };

    const updateTabSession = (
        tabId: string,
        updates: Partial<Omit<TabSessionModel, "tabId" | "_createdAt">>,
    ): void => {
        setStore(
            produce((state) => {
                const session = state.tabSessions[tabId];
                if (!session) return;

                Object.assign(session, updates, { _updatedAt: Date.now() });
            }),
        );
    };

    const setActiveTab = (tabId?: string): void => {
        setStore("activeTabId", tabId);
    };

    const setNavigationPath = (tabId: string, navigationPath: string[]): void => {
        updateTabSession(tabId, { navigationPath });
    };

    const removeTabSession = (tabId: string): TabSessionModel | undefined => {
        const session = getTabSession(tabId);
        if (!session) return;

        setStore(
            produce((state) => {
                delete state.tabSessions[tabId];

                if (state.activeTabId === tabId) {
                    state.activeTabId = undefined;
                }
            }),
        );

        return session;
    };

    return {
        activeTabId,
        getTabSession,
        hasTabSession,
        createTabSession,
        updateTabSession,
        setActiveTab,
        setNavigationPath,
        removeTabSession,
    };
};
