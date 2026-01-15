import { HierarchyPath } from "@cnbn/schema";
import { XYCoords } from "@gately/shared/types";

export interface IWorkspace {
    id: string;
    offset: XYCoords;
    scale: number;
    path: HierarchyPath;
}

export interface IWorkspaceContainer {
    workspaces: Record<string, IWorkspace>;
    activeWorkspaceId: string | undefined;
}

export interface IWorkspaceStore {
    containersByTab: Record<string, IWorkspaceContainer>;
}
