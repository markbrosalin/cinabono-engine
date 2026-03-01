import { describe, expect, it, vi } from "vitest";
import { createWorkspaceSession } from "./createWorkspaceSession";
import {
    WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT,
    WORKSPACE_SESSION_TAB_OPENED_EVENT,
} from "../../model/events";
import type {
    UIEngineScopePersistPatch,
    UIEngineScopeRecord,
    UIEngineTabRecord,
    UIEngineTabSessionRecord,
} from "../../model/types";
import type { WorkspaceStateApi } from "../workspace-state";

const createScopeRecord = (
    overrides: Partial<UIEngineScopeRecord> & Pick<UIEngineScopeRecord, "id">,
): UIEngineScopeRecord => ({
    id: overrides.id,
    kind: overrides.kind ?? "tab",
    name: overrides.name ?? overrides.id,
    path: overrides.path ?? [],
    childrenIds: overrides.childrenIds ?? [],
    contentJson: overrides.contentJson ?? "",
    viewport: overrides.viewport ?? { zoom: 1, tx: 0, ty: 0 },
    _createdAt: overrides._createdAt ?? 0,
    _updatedAt: overrides._updatedAt,
});

const createWorkspaceStateMock = (
    overrides: Partial<WorkspaceStateApi> = {},
): WorkspaceStateApi => ({
    tabs: vi.fn<() => UIEngineTabRecord[]>(() => []),
    orderedTabs: vi.fn<() => UIEngineTabRecord[]>(() => []),
    activeTabId: vi.fn<() => string | undefined>(() => undefined),
    activeScopeId: vi.fn<() => string | undefined>(() => undefined),
    getScope: vi.fn<(scopeId: string) => UIEngineScopeRecord | undefined>(() => undefined),
    hasScope: vi.fn<(scopeId: string) => boolean>(() => true),
    updateScope: vi.fn<(scopeId: string, updates: UIEngineScopePersistPatch) => void>(),
    addTab: vi.fn(),
    removeTab: vi.fn(),
    setActiveScope: vi.fn<(scopeId: string) => void>(),
    setActiveTab: vi.fn<(tabId?: string) => void>(),
    getTabSession: vi.fn<(tabId: string) => UIEngineTabSessionRecord | undefined>(() => undefined),
    hasTabSession: vi.fn<(tabId: string) => boolean>(() => true),
    createTabSession: vi.fn(),
    setNavigationPath: vi.fn<(tabId: string, navigationPath: string[]) => void>(),
    removeTabSession: vi.fn(),
    ...overrides,
});

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
            workspace: createWorkspaceStateMock({
                activeScopeId: () => activeScopeId,
                setActiveScope: vi.fn((scopeId: string) => {
                    activeScopeId = scopeId;
                }),
                getScope: vi.fn((scopeId: string) =>
                    scopeId === "tab-2"
                        ? createScopeRecord({
                              id: "tab-2",
                              contentJson: '{"cells":[]}',
                              viewport: { zoom: 2, tx: 10, ty: 20 },
                          })
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
            }),
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
        expect(emit).toHaveBeenNthCalledWith(1, WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT, {
            tabId: "tab-2",
            activeScopeId: "tab-2",
            navigationPath: ["tab-2"],
        });
        expect(emit).toHaveBeenNthCalledWith(2, WORKSPACE_SESSION_TAB_OPENED_EVENT, {
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
            workspace: createWorkspaceStateMock({
                activeScopeId: () => "tab-1",
                setActiveScope: vi.fn(),
                getScope: vi.fn(() =>
                    createScopeRecord({
                        id: "tab-1",
                        contentJson: '{"cells":[2]}',
                        viewport: { zoom: 3, tx: 6, ty: 9 },
                    }),
                ),
                hasScope: vi.fn(() => true),
                updateScope: vi.fn(),
                activeTabId: vi.fn(),
                setActiveTab: vi.fn(),
                getTabSession: vi.fn(),
                hasTabSession: vi.fn(() => true),
                createTabSession: vi.fn(),
                setNavigationPath: vi.fn(),
                removeTabSession: vi.fn(),
            }),
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
