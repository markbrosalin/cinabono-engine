import { describe, expect, it, vi } from "vitest";
import { createWorkspaceSession } from "./createWorkspaceSession";
import { WORKSPACE_SESSION_TAB_OPENED_EVENT } from "../../model/events";

describe("createWorkspaceSession", () => {
    it("persists current snapshot before switching tabs and restores next tab snapshot", () => {
        let activeTabId = "tab-1";
        let activeScopeId = "tab-1";

        const updateScope = vi.fn();
        const setNavigationPath = vi.fn();
        const importScopeSnapshot = vi.fn();
        const exportScopeSnapshot = vi.fn(() => ({
            contentJson: '{"cells":[1]}',
            viewport: { zoom: 1.5, tx: 4, ty: 8 },
        }));
        const emit = vi.fn();

        const workspaceSession = createWorkspaceSession({
            logicEngine: {
                call: vi.fn(),
            },
            workspace: {
                addTab: vi.fn(),
                removeTab: vi.fn(),
                orderedTabs: vi.fn(() => []),
                activeScopeId: () => activeScopeId,
                setActiveScope: vi.fn((scopeId: string) => {
                    activeScopeId = scopeId;
                }),
                getScope: vi.fn((scopeId: string) =>
                    scopeId === "tab-2"
                        ? {
                              id: "tab-2",
                              contentJson: '{"cells":[]}',
                              viewport: { zoom: 2, tx: 10, ty: 20 },
                          }
                        : undefined,
                ),
                hasScope: vi.fn(() => true),
                updateScope,
                activeTabId: () => activeTabId,
                setActiveTab: vi.fn((tabId?: string) => {
                    if (tabId) activeTabId = tabId;
                }),
                getTabSession: vi.fn((tabId: string) =>
                    tabId === "tab-2"
                        ? {
                              tabId: "tab-2",
                              rootScopeId: "tab-2",
                              navigationPath: ["tab-2"],
                          }
                        : undefined,
                ),
                hasTabSession: vi.fn(() => true),
                createTabSession: vi.fn(),
                setNavigationPath,
                removeTabSession: vi.fn(),
            },
            getRuntimeSnapshotApi: () => ({
                exportScopeSnapshot,
                importScopeSnapshot,
            }),
            emit,
        });

        workspaceSession.openTab("tab-2");

        expect(updateScope).toHaveBeenCalledWith(
            "tab-1",
            expect.objectContaining({
                contentJson: '{"cells":[1]}',
                viewport: { zoom: 1.5, tx: 4, ty: 8 },
            }),
        );
        expect(setNavigationPath).toHaveBeenCalledWith("tab-2", ["tab-2"]);
        expect(importScopeSnapshot).toHaveBeenCalledWith({
            contentJson: '{"cells":[]}',
            viewport: { zoom: 2, tx: 10, ty: 20 },
        });
        expect(emit).toHaveBeenCalledWith(WORKSPACE_SESSION_TAB_OPENED_EVENT, {
            tabId: "tab-2",
            activeScopeId: "tab-2",
            navigationPath: ["tab-2"],
        });
    });

    it("syncs stored active scope snapshot into runtime after mount", () => {
        const importScopeSnapshot = vi.fn();

        const workspaceSession = createWorkspaceSession({
            logicEngine: {
                call: vi.fn(),
            },
            workspace: {
                addTab: vi.fn(),
                removeTab: vi.fn(),
                orderedTabs: vi.fn(() => []),
                activeScopeId: () => "tab-1",
                setActiveScope: vi.fn(),
                getScope: vi.fn(() => ({
                    id: "tab-1",
                    contentJson: '{"cells":[2]}',
                    viewport: { zoom: 3, tx: 6, ty: 9 },
                })),
                hasScope: vi.fn(() => true),
                updateScope: vi.fn(),
                activeTabId: vi.fn(),
                setActiveTab: vi.fn(),
                getTabSession: vi.fn(),
                hasTabSession: vi.fn(() => true),
                createTabSession: vi.fn(),
                setNavigationPath: vi.fn(),
                removeTabSession: vi.fn(),
            },
            getRuntimeSnapshotApi: () => ({
                exportScopeSnapshot: vi.fn(),
                importScopeSnapshot,
            }),
        });

        workspaceSession.syncRuntimeSnapshot();

        expect(importScopeSnapshot).toHaveBeenCalledWith({
            contentJson: '{"cells":[2]}',
            viewport: { zoom: 3, tx: 6, ty: 9 },
        });
    });
});
