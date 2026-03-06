import type { WorkspaceNavigationService } from "./navigation/types";
import type { WorkspaceSnapshotService } from "./snapshot/types";
import type { WorkspaceStateService } from "./state/types";
import type { WorkspaceTabService } from "./tab/types";
import type { WorkspaceExternal } from "../types";
import { ComponentServiceContext } from "@gately/shared/infrastructure/ui-engine/model";

export type WorkspaceServiceName = "state" | "snapshot" | "navigation" | "tab";

export type WorkspaceServices = {
    state: WorkspaceStateService;
    snapshot: WorkspaceSnapshotService;
    navigation: WorkspaceNavigationService;
    tab: WorkspaceTabService;
};

export type WorkspaceServiceContext = ComponentServiceContext<
    WorkspaceExternal,
    WorkspaceServiceName,
    WorkspaceServices
>;

