export interface ScopeStore {
    scopes: Record<string, ScopeModel>;
    activeScopeId: string | null;
}

export interface ScopeModel<K extends ScopeKind = ScopeKind> {
    kind: K;
    id: string;
    path: string[];
    name: string;
    contentJson: string;
    childrenIds: string[];
}

export interface CircuitScopeModel extends ScopeModel<"circuit"> {}
export interface TabScopeModel extends ScopeModel<"tab"> {}

export type ScopePath = string[];
export type ScopeKind = "tab" | "circuit";

interface ScopeMetadata {
    id?: string;
    name?: string;
    path?: ScopePath;
    contentJson?: string;
    childrenIds?: string[];
    options?: ScopeMetadataOptions;
}

interface ScopeMetadataOptions {
    setActive?: boolean;
}

export interface TabScopeMetadata extends Omit<ScopeMetadata, "path"> {}

export interface CircuitScopeMetadata extends ScopeMetadata {
    id: string;
    path: ScopePath;
}

export type ExportedScopeStore = Partial<ScopeStore> & Pick<ScopeStore, "scopes">;
