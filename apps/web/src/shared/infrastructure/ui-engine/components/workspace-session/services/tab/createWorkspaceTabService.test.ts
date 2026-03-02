import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { createUninitializedGetter } from "../../../../lib/registry/types";
import {
    WORKSPACE_SESSION_TAB_CLOSED_EVENT,
    WORKSPACE_SESSION_TAB_CREATED_EVENT,
} from "../../../../model/events";
import type { UIEngineLogicEngine } from "../../../../model/types";
import { buildSharedServices } from "../../../../shared-services";
import { createWorkspaceStateService } from "../state";
import { createWorkspaceTabService } from "./createWorkspaceTabService";
import type { WorkspaceSessionServiceContext } from "../types";

describe("createWorkspaceTabService", () => {
    it("creates a tab, creates its session, emits an event and opens it", async () => {
        await createRoot(async (dispose) => {
            const state = createWorkspaceStateService();
            const openTab = vi.fn();
            const openScope = vi.fn();
            const emit = vi.fn();
            const logicEngine = {
                call: vi.fn().mockResolvedValue({ tabId: "tab-1" }),
            } as unknown as UIEngineLogicEngine;
            const { services: sharedServices, getService: getSharedService } = buildSharedServices();
            vi.spyOn(sharedServices.eventBus, "emit").mockImplementation(emit);
            const navigation = { openTab, openScope };
            const ctx: WorkspaceSessionServiceContext = {
                external: { logicEngine },
                getSharedService,
                getService: createUninitializedGetter("[test] workspace service getter is not initialized"),
            };
            ctx.getService = ((name) => {
                if (name === "state") return state;
                if (name === "navigation") return navigation;
                throw new Error(`[test] unexpected service: ${String(name)}`);
            }) as WorkspaceSessionServiceContext["getService"];

            const tab = createWorkspaceTabService(ctx);

            const result = await tab.createTab({ name: "Main" });

            expect(result).toEqual({ tabId: "tab-1" });
            expect(logicEngine.call).toHaveBeenCalledWith("/tab/create", {});
            expect(state.tabs()).toEqual([{ id: "tab-1", name: "Main" }]);
            expect(state.hasTabSession("tab-1")).toBe(true);
            expect(openTab).toHaveBeenCalledWith("tab-1");
            expect(emit).toHaveBeenCalledWith(WORKSPACE_SESSION_TAB_CREATED_EVENT, {
                tabId: "tab-1",
                rootScopeId: "tab-1",
            });

            dispose();
        });
    });

    it("closes the active tab, opens the next tab and emits an event", async () => {
        await createRoot(async (dispose) => {
            const state = createWorkspaceStateService();
            const openTab = vi.fn();
            const openScope = vi.fn();
            const emit = vi.fn();
            const logicEngine = {
                call: vi.fn().mockResolvedValue({ isTabRemoved: true }),
            } as unknown as UIEngineLogicEngine;
            const { services: sharedServices, getService: getSharedService } = buildSharedServices();
            vi.spyOn(sharedServices.eventBus, "emit").mockImplementation(emit);
            const navigation = { openTab, openScope };

            state.addTab({
                id: "tab-1",
                name: "Main",
                options: { setActive: true },
            });
            state.createTabSession({
                tabId: "tab-1",
                rootScopeId: "tab-1",
            });
            state.addTab({
                id: "tab-2",
                name: "Aux",
            });
            state.createTabSession({
                tabId: "tab-2",
                rootScopeId: "tab-2",
            });

            const ctx: WorkspaceSessionServiceContext = {
                external: { logicEngine },
                getSharedService,
                getService: createUninitializedGetter("[test] workspace service getter is not initialized"),
            };
            ctx.getService = ((name) => {
                if (name === "state") return state;
                if (name === "navigation") return navigation;
                throw new Error(`[test] unexpected service: ${String(name)}`);
            }) as WorkspaceSessionServiceContext["getService"];

            const tab = createWorkspaceTabService(ctx);

            const result = await tab.closeTab("tab-1");

            expect(result).toBe(true);
            expect(logicEngine.call).toHaveBeenCalledWith("/tab/remove", { tabId: "tab-1" });
            expect(state.tabs()).toEqual([{ id: "tab-2", name: "Aux" }]);
            expect(state.hasTabSession("tab-1")).toBe(false);
            expect(openTab).toHaveBeenCalledWith("tab-2");
            expect(emit).toHaveBeenCalledWith(WORKSPACE_SESSION_TAB_CLOSED_EVENT, {
                tabId: "tab-1",
                nextActiveTabId: "tab-2",
            });

            dispose();
        });
    });
});
