import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { createUninitializedGetter } from "../../../../lib/registry/types";
import { WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT } from "../../../../model/events";
import type { UIEngineScope } from "../../../../model/types";
import { buildSharedServices } from "../../../../shared-services";
import { createWorkspaceStateService } from "../state";
import { createWorkspaceNavigationService } from "./createWorkspaceNavigationService";
import type { WorkspaceSessionServiceContext } from "../types";

const createScope = (
    overrides: Partial<UIEngineScope> & Pick<UIEngineScope, "id">,
): UIEngineScope => ({
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

describe("createWorkspaceNavigationService", () => {
    it("opens a nested scope and updates navigation state", () => {
        createRoot((dispose) => {
            const state = createWorkspaceStateService();
            const importScopeSnapshot = vi.fn();
            const persistScopeSnapshot = vi.fn();
            const emit = vi.fn();

            state.addTab({
                id: "tab-1",
                name: "GLOBAL",
                options: { setActive: true },
            });
            state.createTabSession({
                tabId: "tab-1",
                rootScopeId: "tab-1",
            });
            state.upsertScope(
                createScope({
                    id: "circuit-1",
                    kind: "circuit",
                    name: "Circuit 1",
                    path: ["tab-1"],
                    contentJson: '{"cells":[9]}',
                    viewport: { zoom: 2, tx: 10, ty: 20 },
                }),
            );
            state.attachChildScope("tab-1", "circuit-1");

            const { services: sharedServices, getService: getSharedService } = buildSharedServices();
            const eventBus = sharedServices.eventBus;
            vi.spyOn(eventBus, "emit").mockImplementation(emit);
            const snapshot = {
                getStoredScopeSnapshot: (scopeId?: string) => {
                    const scope = scopeId ? state.getScope(scopeId) : undefined;
                    return {
                        contentJson: scope?.contentJson ?? "",
                        viewport: scope?.viewport ?? { zoom: 1, tx: 0, ty: 0 },
                    };
                },
                exportScopeSnapshot: vi.fn(),
                importScopeSnapshot,
                persistScopeSnapshot,
                syncRuntimeSnapshot: vi.fn(),
            };
            const ctx: WorkspaceSessionServiceContext = {
                external: {},
                getSharedService,
                getService: createUninitializedGetter("[test] workspace service getter is not initialized"),
            };
            ctx.getService = ((name) => {
                if (name === "state") return state;
                if (name === "snapshot") return snapshot;
                throw new Error(`[test] unexpected service: ${String(name)}`);
            }) as WorkspaceSessionServiceContext["getService"];

            const navigation = createWorkspaceNavigationService(ctx);

            navigation.openScope("circuit-1");

            expect(persistScopeSnapshot).toHaveBeenCalledWith("tab-1");
            expect(state.getNavigationPath("tab-1")).toEqual(["tab-1", "circuit-1"]);
            expect(state.activeScopeId()).toBe("circuit-1");
            expect(importScopeSnapshot).toHaveBeenCalledWith({
                contentJson: '{"cells":[9]}',
                viewport: { zoom: 2, tx: 10, ty: 20 },
            });
            expect(emit).toHaveBeenCalledWith(WORKSPACE_SESSION_NAVIGATION_CHANGED_EVENT, {
                tabId: "tab-1",
                activeScopeId: "circuit-1",
                navigationPath: ["tab-1", "circuit-1"],
            });

            dispose();
        });
    });
});
