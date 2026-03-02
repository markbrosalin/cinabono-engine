import type { UIEngineComponentServiceContext } from "@gately/shared/infrastructure/ui-engine/model/types";
import type { WorkspaceNavigationService } from "./navigation/types";
import type { WorkspaceSnapshotService } from "./snapshot/types";
import type { WorkspaceStateService } from "./state/types";
import type { WorkspaceTabService } from "./tab/types";
import type { WorkspaceSessionExternal } from "../types";

export type WorkspaceSessionServiceName = "state" | "snapshot" | "navigation" | "tab";

export type WorkspaceSessionServices = {
    state: WorkspaceStateService;
    snapshot: WorkspaceSnapshotService;
    navigation: WorkspaceNavigationService;
    tab: WorkspaceTabService;
};

export type WorkspaceSessionServiceContext = UIEngineComponentServiceContext<
    WorkspaceSessionExternal,
    WorkspaceSessionServiceName,
    WorkspaceSessionServices
>;
