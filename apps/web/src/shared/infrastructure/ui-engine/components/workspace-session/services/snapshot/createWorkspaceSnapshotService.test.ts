import { createRoot } from "solid-js";
import { describe, expect, it, vi } from "vitest";
import { createUninitializedGetter } from "../../../../lib/registry/types";
import { buildSharedServices } from "../../../../shared-services";
import { createWorkspaceStateService } from "../state";
import { createWorkspaceSnapshotService } from "./createWorkspaceSnapshotService";
import type { WorkspaceSessionServiceContext } from "../types";

describe("createWorkspaceSnapshotService", () => {
    it("falls back to stored active scope snapshot when runtime is absent", () => {
        createRoot((dispose) => {
            const state = createWorkspaceStateService();
            state.addTab({
                id: "tab-1",
                contentJson: '{"cells":[5]}',
                viewport: { zoom: 2, tx: 7, ty: 9 },
                options: { setActive: true },
            });

            const { getService: getSharedService } = buildSharedServices();
            const ctx: WorkspaceSessionServiceContext = {
                external: {},
                getSharedService,
                getService: createUninitializedGetter("[test] workspace service getter is not initialized"),
            };
            ctx.getService = ((name) => {
                if (name === "state") return state;
                throw new Error(`[test] unexpected service: ${String(name)}`);
            }) as WorkspaceSessionServiceContext["getService"];

            const snapshot = createWorkspaceSnapshotService(ctx);

            expect(snapshot.exportScopeSnapshot()).toEqual({
                contentJson: '{"cells":[5]}',
                viewport: { zoom: 2, tx: 7, ty: 9 },
            });

            dispose();
        });
    });

    it("persists exported runtime snapshot back into scope state", () => {
        createRoot((dispose) => {
            const state = createWorkspaceStateService();
            state.addTab({
                id: "tab-1",
                options: { setActive: true },
            });

            const { getService: getSharedService } = buildSharedServices();
            const ctx: WorkspaceSessionServiceContext = {
                external: {
                    getRuntimeSnapshotApi: () => ({
                        exportScopeSnapshot: () => ({
                            contentJson: '{"cells":[8]}',
                            viewport: { zoom: 1.2, tx: 3, ty: 4 },
                        }),
                        importScopeSnapshot: vi.fn(),
                    }),
                },
                getSharedService,
                getService: createUninitializedGetter("[test] workspace service getter is not initialized"),
            };
            ctx.getService = ((name) => {
                if (name === "state") return state;
                throw new Error(`[test] unexpected service: ${String(name)}`);
            }) as WorkspaceSessionServiceContext["getService"];

            const snapshot = createWorkspaceSnapshotService(ctx);

            snapshot.persistScopeSnapshot("tab-1");

            expect(state.getScope("tab-1")).toEqual(
                expect.objectContaining({
                    contentJson: '{"cells":[8]}',
                    viewport: { zoom: 1.2, tx: 3, ty: 4 },
                }),
            );

            dispose();
        });
    });
});
