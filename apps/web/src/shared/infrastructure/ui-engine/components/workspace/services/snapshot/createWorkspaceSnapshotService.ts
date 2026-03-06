import type { UIScopeSnapshot } from "@gately/shared/infrastructure/ui-engine/model/types";
import { DEFAULT_SCOPE_SNAPSHOT } from "@gately/shared/infrastructure/ui-engine/model";
import type { WorkspaceServiceContext } from "../types";
import type { WorkspaceSnapshotService } from "./types";

export const createWorkspaceSnapshotService = (
    ctx: WorkspaceServiceContext,
): WorkspaceSnapshotService => {
    const state = ctx.getService("state");
    const snapshotHub = ctx.getSharedService("snapshotHub");

    const getStoredScopeSnapshot = (scopeId?: string): UIScopeSnapshot => {
        const scope = scopeId ? state.getScope(scopeId) : undefined;

        return {
            contentJson: scope?.contentJson ?? DEFAULT_SCOPE_SNAPSHOT.contentJson,
            viewport: scope?.viewport ?? DEFAULT_SCOPE_SNAPSHOT.viewport,
            extensions: scope?.extensions,
        };
    };

    const exportScopeSnapshot = (): UIScopeSnapshot => {
        const runtimeSnapshot = snapshotHub.exportScopeSnapshot();
        if (runtimeSnapshot?.contentJson !== undefined && runtimeSnapshot.viewport) {
            return {
                contentJson: runtimeSnapshot.contentJson,
                viewport: runtimeSnapshot.viewport,
                extensions: runtimeSnapshot.extensions,
            };
        }

        return getStoredScopeSnapshot(state.activeScopeId());
    };

    const importScopeSnapshot = (snapshot?: Partial<UIScopeSnapshot> | null): void => {
        snapshotHub.importScopeSnapshot(snapshot);
    };

    const persistScopeSnapshot = (scopeId?: string): void => {
        if (!scopeId) return;

        const snapshot = exportScopeSnapshot();
        state.updateScope(scopeId, {
            contentJson: snapshot.contentJson,
            viewport: snapshot.viewport,
            extensions: snapshot.extensions,
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

