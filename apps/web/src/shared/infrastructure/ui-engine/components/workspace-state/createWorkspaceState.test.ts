import { createRoot } from "solid-js";
import { describe, expect, it } from "vitest";
import { createWorkspaceState } from "./createWorkspaceState";

describe("createWorkspaceState", () => {
    it("creates tabs and keeps active ids in sync", () => {
        createRoot((dispose) => {
            const state = createWorkspaceState();

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

            dispose();
        });
    });

    it("clears active tab session when active tab is removed", () => {
        createRoot((dispose) => {
            const state = createWorkspaceState();

            state.addTab({
                id: "tab-1",
                options: { setActive: true },
            });
            state.createTabSession({
                tabId: "tab-1",
                rootScopeId: "tab-1",
            });

            state.removeTabSession("tab-1");
            state.removeTab("tab-1");

            expect(state.activeTabId()).toBeUndefined();
            expect(state.activeScopeId()).toBeUndefined();
            expect(state.tabs()).toEqual([]);

            dispose();
        });
    });
});
