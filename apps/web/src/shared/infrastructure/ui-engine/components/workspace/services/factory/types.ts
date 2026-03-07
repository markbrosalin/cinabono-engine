import type { Workspace, WorkspaceTabSession } from "@gately/shared/infrastructure/ui-engine/model";

export type WorkspaceCircuitFactoryInput = Pick<Workspace, "id" | "title" | "path"> &
    Partial<Pick<Workspace, "childrenIds">>;

export type WorkspaceTabFactoryInput = Pick<Workspace, "id"> &
    Partial<Pick<Workspace, "title" | "childrenIds">>;

export type WorkspaceTabSessionCreateInput = Pick<
    WorkspaceTabSession,
    "rootWorkspaceId" | "settings"
>;

export type WorkspaceFactoryService = {
    createTabWorkspace: (data: WorkspaceTabFactoryInput) => Workspace;
    createCircuitWorkspace: (data: WorkspaceCircuitFactoryInput) => Workspace;
    createTabSession: (data: WorkspaceTabSessionCreateInput) => WorkspaceTabSession;
};
