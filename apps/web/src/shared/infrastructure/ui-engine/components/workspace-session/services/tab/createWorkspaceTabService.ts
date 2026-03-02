import {
    WORKSPACE_SESSION_TAB_CLOSED_EVENT,
    WORKSPACE_SESSION_TAB_CREATED_EVENT,
} from "../../../../model/events";
import type { UIEngineTabCloseConditions, UIEngineTabCreateInput } from "../../../../model/types";
import { DEFAULT_WORKSPACE_SNAPSHOT } from "../../constants";
import type { WorkspaceSessionServiceContext } from "../types";
import type { WorkspaceTabService } from "./types";

export const createWorkspaceTabService = (ctx: WorkspaceSessionServiceContext): WorkspaceTabService => {
    const state = ctx.getService("state");
    const navigation = ctx.getService("navigation");
    const emit = ctx.getSharedService("eventBus").emit;

    const requireLogicEngine = () => {
        const logicEngine = ctx.external.logicEngine;
        if (!logicEngine) {
            throw new Error("[UIEngine.workspaceSession] logic engine is not configured");
        }

        return logicEngine;
    };

    const createTab = async (data: UIEngineTabCreateInput = {}): Promise<{ tabId: string }> => {
        const { tabId } = (await requireLogicEngine().call("/tab/create", {})) as { tabId: string };

        const tab = state.addTab({
            id: tabId,
            childrenIds: data.childrenIds,
            name: data.name ?? "New Tab",
            contentJson: data.contentJson ?? DEFAULT_WORKSPACE_SNAPSHOT.contentJson,
            viewport: data.viewport ?? DEFAULT_WORKSPACE_SNAPSHOT.viewport,
            options: { setActive: false },
        });

        state.createTabSession({
            tabId: tab.id,
            rootScopeId: tab.id,
            navigationPath: [tab.id],
        });

        emit(WORKSPACE_SESSION_TAB_CREATED_EVENT, {
            tabId: tab.id,
            rootScopeId: tab.id,
        });

        if (data.options?.setActive ?? true) {
            navigation.openTab(tab.id);
        }

        return { tabId: tab.id };
    };

    const canCloseTab = (tabId: string, conditions?: UIEngineTabCloseConditions): boolean => {
        if (state.orderedTabs().length <= 1) return false;
        if (!state.hasScope(tabId) || !state.hasTabSession(tabId)) return false;
        if (conditions?.isEditing) return false;
        return true;
    };

    const closeTab = async (
        tabId: string,
        conditions?: UIEngineTabCloseConditions,
    ): Promise<boolean> => {
        if (!canCloseTab(tabId, conditions)) {
            throw new Error(`[UIEngine.workspaceSession.closeTab]: Couldn't remove tab ${tabId}.`);
        }

        const tabs = state.orderedTabs();
        const activeTabId = state.activeTabId();
        const nextActiveTabId = (() => {
            if (activeTabId !== tabId) return activeTabId;

            const idx = tabs.findIndex((tab) => tab.id === tabId);
            if (idx === -1) return activeTabId;

            return tabs[idx + 1]?.id ?? tabs[idx - 1]?.id;
        })();

        const result = (await requireLogicEngine().call("/tab/remove", { tabId })) as {
            isTabRemoved?: boolean;
        };

        if (!result.isTabRemoved) {
            return false;
        }

        state.removeTabSession(tabId);
        state.removeTab(tabId);

        if (nextActiveTabId) {
            navigation.openTab(nextActiveTabId);
        }

        emit(WORKSPACE_SESSION_TAB_CLOSED_EVENT, {
            tabId,
            nextActiveTabId,
        });

        return true;
    };

    return {
        createTab,
        canCloseTab,
        closeTab,
    };
};
