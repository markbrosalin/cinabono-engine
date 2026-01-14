import { HierarchyPath } from "@cnbn/schema";
import { XYCoords, ScaleFactor } from "@gately/shared/ui/Container/types";

export interface IWorkspace {
    id: string;
    panOffset: XYCoords;
    scaleFactor: ScaleFactor;
    path: HierarchyPath;
}

export interface IWorkspaceContainer {
    workspaces: Record<string, IWorkspace>;
    activeWorkspace: IWorkspace | undefined;
}

export interface IWorkspaceStore {
    containersByTab: Record<string, IWorkspaceContainer>;
}
