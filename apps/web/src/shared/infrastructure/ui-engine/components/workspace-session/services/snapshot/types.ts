import type { UIScopeSnapshot } from "../../../../model/types";

export type WorkspaceSessionRuntimeSnapshotApi = {
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
};

export type WorkspaceSnapshotService = {
    getStoredScopeSnapshot: (scopeId?: string) => UIScopeSnapshot;
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
    persistScopeSnapshot: (scopeId?: string) => void;
    syncRuntimeSnapshot: () => void;
};
