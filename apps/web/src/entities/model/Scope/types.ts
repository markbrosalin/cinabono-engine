export interface ScopeStore {
    scopes: Record<string, ScopeModel>;
    activeScopeId: string | undefined;
}

export interface ScopeModel<K extends ScopeKind = ScopeKind> {
    kind: K;
    id: string;
    path: string[];
    name: string;
    contentJson: string;
    childrenIds: string[];
}

export type ScopePath = string[];
export type ScopeKind = "tab" | "circuit";

export interface ScopeMetadata<T extends ScopeKind = ScopeKind> {
    kind: T;
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

export type ExportedScopeStore = Partial<ScopeStore> & Pick<ScopeStore, "scopes">;
