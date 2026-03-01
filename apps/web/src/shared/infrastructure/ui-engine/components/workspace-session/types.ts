import type { EventBusServiceContract } from "../../services/event-bus";
import type {
    UIEngineLogicEngine,
    UIScopeSnapshot,
    UIEngineTabCloseConditions,
    UIEngineTabCreateInput,
    UIEngineWorkspaceSessionAdapter,
} from "../../model/types";

export type WorkspaceSessionDeps = {
    logicEngine: UIEngineLogicEngine;
    workspace: UIEngineWorkspaceSessionAdapter;
    getRuntimeSnapshotApi?: () => WorkspaceSessionRuntimeSnapshotApi | undefined;
    emit?: EventBusServiceContract["emit"];
};

export type WorkspaceSessionCreateTabInput = UIEngineTabCreateInput;
export type WorkspaceSessionCloseTabConditions = UIEngineTabCloseConditions;

export type WorkspaceSessionRuntimeSnapshotApi = {
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
};
