import type { EventBusServiceContract } from "../../services/event-bus";
import type {
    UIEngineLogicEngine,
    UIScopeSnapshot,
    UIEngineTabCloseConditions,
    UIEngineTabCreateInput,
} from "../../model/types";
import type { WorkspaceStateApi } from "../workspace-state";

export type WorkspaceSessionDeps = {
    logicEngine: UIEngineLogicEngine;
    workspace: WorkspaceStateApi;
    getRuntimeSnapshotApi?: () => WorkspaceSessionRuntimeSnapshotApi | undefined;
    emit?: EventBusServiceContract["emit"];
};

export type WorkspaceSessionCreateTabInput = UIEngineTabCreateInput;
export type WorkspaceSessionCloseTabConditions = UIEngineTabCloseConditions;

export type WorkspaceSessionRuntimeSnapshotApi = {
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
};
