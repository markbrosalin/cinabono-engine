import type { UIScopeSnapshot } from "../../../../model/types";
import { DEFAULT_WORKSPACE_SNAPSHOT } from "../../constants";
import type { WorkspaceSessionServiceContext } from "../types";
import type { WorkspaceSnapshotService } from "./types";

export const createWorkspaceSnapshotService = (
    ctx: WorkspaceSessionServiceContext,
): WorkspaceSnapshotService => {
    const state = ctx.getService("state");

    const getStoredScopeSnapshot = (scopeId?: string): UIScopeSnapshot => {
        const scope = scopeId ? state.getScope(scopeId) : undefined;

        return {
            contentJson: scope?.contentJson ?? DEFAULT_WORKSPACE_SNAPSHOT.contentJson,
            viewport: scope?.viewport ?? DEFAULT_WORKSPACE_SNAPSHOT.viewport,
        };
    };

    const exportScopeSnapshot = (): UIScopeSnapshot => {
        const runtime = ctx.external.getRuntimeSnapshotApi?.();
        if (runtime) {
            return runtime.exportScopeSnapshot();
        }

        return getStoredScopeSnapshot(state.activeScopeId());
    };

    const importScopeSnapshot = (snapshot?: Partial<UIScopeSnapshot> | null): void => {
        ctx.external.getRuntimeSnapshotApi?.()?.importScopeSnapshot(snapshot);
    };

    const persistScopeSnapshot = (scopeId?: string): void => {
        if (!scopeId) return;

        const snapshot = exportScopeSnapshot();
        state.updateScope(scopeId, {
            contentJson: snapshot.contentJson,
            viewport: snapshot.viewport,
            _updatedAt: Date.now(),
        });
    };

    const syncRuntimeSnapshot = (): void => {
        importScopeSnapshot(getStoredScopeSnapshot(state.activeScopeId()));
    };

    return {
        getStoredScopeSnapshot,
        exportScopeSnapshot,
        importScopeSnapshot,
        persistScopeSnapshot,
        syncRuntimeSnapshot,
    };
};
