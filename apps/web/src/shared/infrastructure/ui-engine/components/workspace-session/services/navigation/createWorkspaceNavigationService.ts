import {
    WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT,
    WORKSPACE_SESSION_TAB_OPENED_EVENT,
} from "../../../../model/events";
import type { WorkspaceSessionServiceContext } from "../types";
import type { WorkspaceNavigationService } from "./types";

export const createWorkspaceNavigationService = (
    ctx: WorkspaceSessionServiceContext,
): WorkspaceNavigationService => {
    const state = ctx.getService("state");
    const snapshot = ctx.getService("snapshot");
    const emit = ctx.getSharedService("eventBus").emit;

    const applyNavigation = (
        tabId: string,
        navigationPath: string[],
        options?: { emitTabOpened?: boolean },
    ): void => {
        const nextScopeId = navigationPath.at(-1);
        if (!nextScopeId) return;

        const currentTabId = state.activeTabId();
        const currentScopeId = state.activeScopeId();
        if (currentTabId === tabId && currentScopeId === nextScopeId) return;

        state.setActiveTab(tabId);
        state.setNavigationPath(tabId, navigationPath);
        state.setActiveScope(nextScopeId);

        snapshot.importScopeSnapshot(snapshot.getStoredScopeSnapshot(nextScopeId));

        emit(WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT, {
            tabId,
            activeScopeId: nextScopeId,
            navigationPath,
        });

        if (options?.emitTabOpened) {
            emit(WORKSPACE_SESSION_TAB_OPENED_EVENT, {
                tabId,
                activeScopeId: nextScopeId,
                navigationPath,
            });
        }
    };

    const resolveNavigationPath = (rootScopeId: string, scopeId: string): string[] | undefined => {
        const scope = state.getScope(scopeId);
        if (!scope) return;

        const absolutePath = [...scope.path, scope.id];
        const rootIndex = absolutePath.indexOf(rootScopeId);
        if (rootIndex === -1) return;

        return absolutePath.slice(rootIndex);
    };

    const openTab = (tabId?: string): void => {
        if (!tabId) return;
        if (!state.hasScope(tabId)) return;

        if (!state.hasTabSession(tabId)) {
            state.createTabSession({
                tabId,
                rootScopeId: tabId,
                navigationPath: [tabId],
            });
        }

        const currentTabId = state.activeTabId();
        const nextNavigationPath = state.getNavigationPath(tabId);
        const nextScopeId = nextNavigationPath.at(-1) ?? tabId;

        if (currentTabId !== tabId || state.activeScopeId() !== nextScopeId) {
            snapshot.persistScopeSnapshot(state.activeScopeId());
        }

        applyNavigation(tabId, nextNavigationPath.length > 0 ? nextNavigationPath : [tabId], {
            emitTabOpened: true,
        });
    };

    const openScope = (scopeId: string, tabId = state.activeTabId()): void => {
        if (!tabId) return;
        if (!state.hasTabSession(tabId) || !state.hasScope(scopeId)) return;

        const session = state.getTabSession(tabId);
        if (!session) return;

        const nextNavigationPath = resolveNavigationPath(session.rootScopeId, scopeId);
        if (!nextNavigationPath) return;

        const nextScopeId = nextNavigationPath.at(-1);
        if (!nextScopeId) return;

        if (state.activeTabId() === tabId && state.activeScopeId() !== nextScopeId) {
            snapshot.persistScopeSnapshot(state.activeScopeId());
        }

        applyNavigation(tabId, nextNavigationPath);
    };

    return {
        openTab,
        openScope,
    };
};
