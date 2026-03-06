import type { UIScopeSnapshot } from "@gately/shared/infrastructure/ui-engine/model/types";

export type WorkspaceSnapshotService = {
    getStoredScopeSnapshot: (scopeId?: string) => UIScopeSnapshot;
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
    persistScopeSnapshot: (scopeId?: string) => void;
    syncRuntimeSnapshot: () => void;
};
