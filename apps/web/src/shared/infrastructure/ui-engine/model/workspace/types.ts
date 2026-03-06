import { Timestamps } from "../core/entity";

export type WorkspaceKind = "tab" | "circuit";
export type WorkspaceSymbolStandard = "ansi" | "ieee";

export type Workspace = Timestamps & {
    id: string;
    kind: WorkspaceKind;
    name: string;
    path: string[];
    childrenIds: string[];
};

export type WorkspacePersistPatch = Partial<
    Pick<Workspace, "name" | "path" | "childrenIds"> & Timestamps
>;

export type WorkspaceTabSessionSettings = {
    symbolStandard?: WorkspaceSymbolStandard;
};

export type WorkspaceTabSession = Timestamps & {
    tabId: string;
    title: string;
    activeWorkspaceId: string;
    navigationPath: string[];
    settings?: WorkspaceTabSessionSettings;
};

export type WorkspaceTabSessionCreateInput = Pick<WorkspaceTabSession, "tabId"> &
    Omit<Partial<WorkspaceTabSession>, "updatedAt" | "createdAt">;
