import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import { createWorkspaceStateService } from "./createWorkspaceStateService";

describe("createWorkspaceStateService", () => {
    it("creates tabs and keeps active ids in sync", () => {
        createRoot((dispose) => {
            const state = createWorkspaceStateService();

            const tab = state.addTab({
                id: "tab-1",
                name: "Main",
                options: { setActive: true },
            });

            state.createTabSession({
                tabId: tab.id,
                rootScopeId: tab.id,
            });

            expect(state.tabs()).toEqual([{ id: "tab-1", name: "Main" }]);
            expect(state.activeTabId()).toBe("tab-1");
            expect(state.activeScopeId()).toBe("tab-1");
            expect(state.getScope("tab-1")?.name).toBe("Main");
            expect(state.getNavigationPath("tab-1")).toEqual(["tab-1"]);
            expect(state.getNavigationScopes("tab-1").map((scope) => scope.id)).toEqual(["tab-1"]);
            expect(state.getScopeChildren("tab-1")).toEqual([]);

            dispose();
        });
    });

    it("attaches child scopes and clears active ids when active tab is removed", () => {
        createRoot((dispose) => {
            const state = createWorkspaceStateService();

            state.addTab({
                id: "tab-1",
                options: { setActive: true },
            });
            state.createTabSession({
                tabId: "tab-1",
                rootScopeId: "tab-1",
            });
            state.upsertScope({
                id: "circuit-1",
                kind: "circuit",
                name: "Circuit 1",
                path: ["tab-1"],
                childrenIds: [],
                contentJson: "",
                viewport: { zoom: 1, tx: 0, ty: 0 },
                _createdAt: 1,
            });
            state.attachChildScope("tab-1", "circuit-1");

            expect(state.getScopeChildren("tab-1").map((scope) => scope.id)).toEqual(["circuit-1"]);

            state.removeTabSession("tab-1");
            state.removeTab("tab-1");

            expect(state.activeTabId()).toBeUndefined();
            expect(state.activeScopeId()).toBeUndefined();
            expect(state.tabs()).toEqual([]);

            dispose();
        });
    });
});
