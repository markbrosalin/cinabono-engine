import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { createWorkspaceSession } from "./createWorkspaceSession";
import { buildSharedServices } from "../../shared-services";
import { WORKSPACE_SESSION_TAB_OPENED_EVENT } from "../../model/events";
import type { UIEngineLogicEngine } from "../../model/types";

const createSharedGetter = () => {
    const shared = buildSharedServices();
    return {
        eventBus: shared.services.eventBus,
        getSharedService: shared.getService,
    };
};

describe("createWorkspaceSession", () => {
    it("creates tabs through public API and opens a target tab", async () => {
        await createRoot(async (dispose) => {
            const importScopeSnapshot = vi.fn();
            const exportScopeSnapshot = vi.fn(() => ({
                contentJson: '{"cells":[1]}',
                viewport: { zoom: 1.5, tx: 4, ty: 8 },
            }));
            const { eventBus, getSharedService } = createSharedGetter();
            const emitSpy = vi.spyOn(eventBus, "emit");
            const logicCall = vi
                .fn()
                .mockResolvedValueOnce({ tabId: "tab-1" })
                .mockResolvedValueOnce({ tabId: "tab-2" });

            const workspaceSession = createWorkspaceSession({
                getSharedService,
                external: {
                    logicEngine: {
                        call: logicCall,
                    } as unknown as UIEngineLogicEngine,
                    getRuntimeSnapshotApi: () => ({
                        exportScopeSnapshot,
                        importScopeSnapshot,
                    }),
                },
            });

            await workspaceSession.createTab({
                name: "Tab 1",
            });
            importScopeSnapshot.mockClear();
            emitSpy.mockClear();

            await workspaceSession.createTab({
                name: "Tab 2",
                contentJson: '{"cells":[]}',
                viewport: { zoom: 2, tx: 10, ty: 20 },
                options: { setActive: false },
            });

            workspaceSession.openTab("tab-2");

            expect(workspaceSession.state.tabs()).toEqual([
                { id: "tab-1", name: "Tab 1" },
                { id: "tab-2", name: "Tab 2" },
            ]);
            expect(workspaceSession.state.activeTabId()).toBe("tab-2");
            expect(workspaceSession.state.activeScopeId()).toBe("tab-2");
            expect(workspaceSession.state.getScope("tab-1")).toEqual(
                expect.objectContaining({
                    contentJson: '{"cells":[1]}',
                    viewport: { zoom: 1.5, tx: 4, ty: 8 },
                }),
            );
            expect(importScopeSnapshot).toHaveBeenCalledWith({
                contentJson: '{"cells":[]}',
                viewport: { zoom: 2, tx: 10, ty: 20 },
            });
            expect(emitSpy).toHaveBeenCalledWith(WORKSPACE_SESSION_TAB_OPENED_EVENT, {
                tabId: "tab-2",
                activeScopeId: "tab-2",
                navigationPath: ["tab-2"],
            });

            dispose();
        });
    });

    it("syncs the active scope snapshot into runtime", async () => {
        await createRoot(async (dispose) => {
            const importScopeSnapshot = vi.fn();
            const { getSharedService } = createSharedGetter();

            const workspaceSession = createWorkspaceSession({
                getSharedService,
                external: {
                    logicEngine: {
                        call: vi.fn().mockResolvedValue({ tabId: "tab-1" }),
                    } as unknown as UIEngineLogicEngine,
                    getRuntimeSnapshotApi: () => ({
                        exportScopeSnapshot: vi.fn(),
                        importScopeSnapshot,
                    }),
                },
            });

            await workspaceSession.createTab({
                name: "Tab 1",
                contentJson: '{"cells":[2]}',
                viewport: { zoom: 3, tx: 6, ty: 9 },
            });

            importScopeSnapshot.mockClear();
            workspaceSession.syncRuntimeSnapshot();

            expect(importScopeSnapshot).toHaveBeenCalledWith({
                contentJson: '{"cells":[2]}',
                viewport: { zoom: 3, tx: 6, ty: 9 },
            });

            dispose();
        });
    });
});
