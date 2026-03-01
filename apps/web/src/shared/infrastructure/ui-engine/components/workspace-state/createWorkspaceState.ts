import { createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type {
    UIEngineScopePersistPatch,
    UIEngineScopeRecord,
    UIEngineTabCreateInput,
    UIEngineTabRecord,
    UIEngineTabSessionCreateInput,
    UIEngineTabSessionRecord,
} from "../../model/types";
import type { WorkspaceStateApi } from "./types";

type WorkspaceStateStore = {
    scopes: Record<string, UIEngineScopeRecord>;
    tabSessions: Record<string, UIEngineTabSessionRecord>;
    orderedTabIds: string[];
    activeScopeId: string | undefined;
    activeTabId: string | undefined;
};

const DEFAULT_VIEWPORT = { zoom: 1, tx: 0, ty: 0 } as const;

export const createWorkspaceState = (): WorkspaceStateApi => {
    const [store, setStore] = createStore<WorkspaceStateStore>({
        scopes: {},
        tabSessions: {},
        orderedTabIds: [],
        activeScopeId: undefined,
        activeTabId: undefined,
    });

    const tabs = createMemo<UIEngineTabRecord[]>(() =>
        store.orderedTabIds
            .map((id) => store.scopes[id])
            .filter((scope): scope is UIEngineScopeRecord => Boolean(scope))
            .map((scope) => ({
                id: scope.id,
                name: scope.name,
            })),
    );

    const orderedTabs = () => tabs();
    const activeTabId = () => store.activeTabId;
    const activeScopeId = () => store.activeScopeId;

    const getScope = (scopeId: string): UIEngineScopeRecord | undefined => {
        return store.scopes[scopeId];
    };

    const hasScope = (scopeId: string): boolean => {
        return Boolean(getScope(scopeId));
    };

    const updateScope = (scopeId: string, updates: UIEngineScopePersistPatch): void => {
        setStore(
            produce((state) => {
                const scope = state.scopes[scopeId];
                if (!scope) return;

                Object.assign(scope, updates);
            }),
        );
    };

    const setActiveScope = (scopeId: string): void => {
        setStore("activeScopeId", scopeId);
    };

    const setActiveTab = (tabId?: string): void => {
        setStore("activeTabId", tabId);
    };

    const addTab = (data: UIEngineTabCreateInput): UIEngineTabRecord => {
        const tabId = data.id;
        if (!tabId) {
            throw new Error("[UIEngine.workspaceState.addTab]: tab id is required");
        }

        const scope: UIEngineScopeRecord = {
            id: tabId,
            kind: "tab",
            name: data.name ?? "New Tab",
            path: [],
            childrenIds: data.childrenIds ?? [],
            contentJson: data.contentJson ?? "",
            viewport: data.viewport ?? DEFAULT_VIEWPORT,
            _createdAt: Date.now(),
        };

        setStore("scopes", scope.id, scope);
        setStore("orderedTabIds", (prev) => [...prev, scope.id]);

        if (data.options?.setActive) {
            setActiveTab(scope.id);
            setActiveScope(scope.id);
        }

        return {
            id: scope.id,
            name: scope.name,
        };
    };

    const removeTab = (tabId: string): UIEngineTabRecord | undefined => {
        const scope = getScope(tabId);
        if (!scope) return;

        setStore(
            produce((state) => {
                delete state.scopes[tabId];
                state.orderedTabIds = state.orderedTabIds.filter((id) => id !== tabId);

                if (state.activeScopeId === tabId) {
                    state.activeScopeId = undefined;
                }
            }),
        );

        return {
            id: scope.id,
            name: scope.name,
        };
    };

    const getTabSession = (tabId: string): UIEngineTabSessionRecord | undefined => {
        return store.tabSessions[tabId];
    };

    const hasTabSession = (tabId: string): boolean => {
        return Boolean(getTabSession(tabId));
    };

    const createTabSession = (data: UIEngineTabSessionCreateInput): UIEngineTabSessionRecord => {
        const existing = getTabSession(data.tabId);
        if (existing) {
            return existing;
        }

        const session: UIEngineTabSessionRecord = {
            tabId: data.tabId,
            rootScopeId: data.rootScopeId,
            navigationPath: data.navigationPath ?? [data.rootScopeId],
        };

        setStore("tabSessions", session.tabId, session);

        return session;
    };

    const setNavigationPath = (tabId: string, navigationPath: string[]): void => {
        setStore("tabSessions", tabId, "navigationPath", navigationPath);
    };

    const removeTabSession = (tabId: string): UIEngineTabSessionRecord | undefined => {
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
        tabs,
        orderedTabs,
        activeTabId,
        activeScopeId,
        getScope,
        hasScope,
        updateScope,
        addTab,
        removeTab,
        setActiveScope,
        setActiveTab,
        getTabSession,
        hasTabSession,
        createTabSession,
        setNavigationPath,
        removeTabSession,
    };
};
