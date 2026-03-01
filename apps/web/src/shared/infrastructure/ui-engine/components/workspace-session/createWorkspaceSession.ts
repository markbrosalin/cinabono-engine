import {
    WORKSPACE_SESSION_TAB_CLOSED_EVENT,
    WORKSPACE_SESSION_TAB_CREATED_EVENT,
    WORKSPACE_SESSION_TAB_OPENED_EVENT,
} from "../../model/events";
import type { UIScopeSnapshot } from "../../model/types";
import { DEFAULT_WORKSPACE_SNAPSHOT } from "./constants";
import type {
    WorkspaceSessionCloseTabConditions,
    WorkspaceSessionCreateTabInput,
    WorkspaceSessionDeps,
} from "./types";

export const createWorkspaceSession = (deps: WorkspaceSessionDeps) => {
    const { logicEngine, workspace } = deps;

    const getStoredScopeSnapshot = (scopeId?: string) => {
        const scope = scopeId ? workspace.getScope(scopeId) : undefined;

        return {
            contentJson: scope?.contentJson ?? DEFAULT_WORKSPACE_SNAPSHOT.contentJson,
            viewport: scope?.viewport ?? DEFAULT_WORKSPACE_SNAPSHOT.viewport,
        };
    };

    const exportScopeSnapshot = () => {
        const runtime = deps.getRuntimeSnapshotApi?.();
        if (runtime) {
            return runtime.exportScopeSnapshot();
        }

        return getStoredScopeSnapshot(workspace.activeScopeId());
    };

    const importScopeSnapshot = (snapshot?: Partial<UIScopeSnapshot> | null) => {
        deps.getRuntimeSnapshotApi?.()?.importScopeSnapshot(snapshot);
    };

    const createTab = async (
        data: WorkspaceSessionCreateTabInput = {},
    ): Promise<{ tabId: string }> => {
        const { tabId } = (await logicEngine.call("/tab/create", {})) as { tabId: string };

        const tab = workspace.addTab({
            id: tabId,
            childrenIds: data.childrenIds,
            name: data.name ?? "New Tab",
            contentJson: data.contentJson ?? DEFAULT_WORKSPACE_SNAPSHOT.contentJson,
            viewport: data.viewport ?? DEFAULT_WORKSPACE_SNAPSHOT.viewport,
            options: { setActive: false },
        });

        workspace.createTabSession({
            tabId: tab.id,
            rootScopeId: tab.id,
            navigationPath: [tab.id],
            options: { setActive: false },
        });

        deps.emit?.(WORKSPACE_SESSION_TAB_CREATED_EVENT, {
            tabId: tab.id,
            rootScopeId: tab.id,
        });

        const shouldSetActive = data.options?.setActive ?? true;
        if (shouldSetActive) {
            openTab(tab.id);
        }

        return { tabId: tab.id };
    };

    const openTab = (tabId?: string): void => {
        if (!tabId) return;
        if (!workspace.hasScope(tabId)) return;

        if (!workspace.hasTabSession(tabId)) {
            workspace.createTabSession({
                tabId,
                rootScopeId: tabId,
                navigationPath: [tabId],
                options: { setActive: false },
            });
        }

        const currentScopeId = workspace.activeScopeId();
        const currentTabId = workspace.activeTabId();

        if (currentScopeId && currentTabId && currentTabId !== tabId) {
            const snapshot = exportScopeSnapshot();

            workspace.updateScope(currentScopeId, {
                contentJson: snapshot.contentJson,
                viewport: snapshot.viewport,
                _updatedAt: Date.now(),
            });
        }

        const nextSession = workspace.getTabSession(tabId);
        const nextNavigationPath = nextSession?.navigationPath ?? [tabId];
        const nextScopeId = nextNavigationPath.at(-1) ?? tabId;

        if (currentTabId === tabId && currentScopeId === nextScopeId) return;

        workspace.setActiveTab(tabId);
        workspace.setNavigationPath(tabId, nextNavigationPath);
        workspace.setActiveScope(nextScopeId);

        importScopeSnapshot(getStoredScopeSnapshot(nextScopeId));

        deps.emit?.(WORKSPACE_SESSION_TAB_OPENED_EVENT, {
            tabId,
            activeScopeId: nextScopeId,
            navigationPath: nextNavigationPath,
        });
    };

    const canCloseTab = (
        tabId: string,
        conditions?: WorkspaceSessionCloseTabConditions,
    ): boolean => {
        if (workspace.orderedTabs().length <= 1) return false;
        if (!workspace.hasScope(tabId) || !workspace.hasTabSession(tabId)) return false;
        if (conditions?.isEditing) return false;
        return true;
    };

    const closeTab = async (
        tabId: string,
        conditions?: WorkspaceSessionCloseTabConditions,
    ): Promise<boolean> => {
        if (!canCloseTab(tabId, conditions)) {
            throw new Error(`[UIEngine.workspaceSession.closeTab]: Couldn't remove tab ${tabId}.`);
        }

        const tabs = workspace.orderedTabs();
        const activeTabId = workspace.activeTabId();
        const nextActiveTabId = (() => {
            if (activeTabId !== tabId) return activeTabId;

            const idx = tabs.findIndex((tab) => tab.id === tabId);
            if (idx === -1) return activeTabId;

            return tabs[idx + 1]?.id ?? tabs[idx - 1]?.id;
        })();

        const result = (await logicEngine.call("/tab/remove", { tabId })) as {
            isTabRemoved?: boolean;
        };

        if (!result.isTabRemoved) {
            return false;
        }

        workspace.removeTabSession(tabId);
        workspace.removeTab(tabId);

        if (nextActiveTabId) {
            openTab(nextActiveTabId);
        }

        deps.emit?.(WORKSPACE_SESSION_TAB_CLOSED_EVENT, {
            tabId,
            nextActiveTabId,
        });

        return true;
    };

    const syncRuntimeSnapshot = (): void => {
        importScopeSnapshot(getStoredScopeSnapshot(workspace.activeScopeId()));
    };

    return {
        createTab,
        openTab,
        canCloseTab,
        closeTab,
        syncRuntimeSnapshot,
    };
};
