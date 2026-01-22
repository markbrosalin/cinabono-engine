import { UIScopeSnapshot } from "@gately/shared/infrastructure/UIEngine";

export interface ScopeStore {
    scopes: Record<string, ScopeModel>;
    activeScopeId: string | undefined;
}

export interface ScopeModel<K extends ScopeKind = ScopeKind> extends UIScopeSnapshot {
    kind: K;
    id: string;
    path: string[];
    name: string;
    childrenIds: string[];

    _createdAt: number;
    _updatedAt?: number;
    _schemaVersion?: number;
}

export type ScopePath = string[];
export type ScopeKind = "tab" | "circuit";

export interface ScopeMetadata<T extends ScopeKind = ScopeKind> extends Partial<UIScopeSnapshot> {
    kind: T;
    id?: string;
    name?: string;
    path?: ScopePath;
    childrenIds?: string[];
    options?: ScopeMetadataOptions;
}

interface ScopeMetadataOptions {
    setActive?: boolean;
}

export type ExportedScopeStore = Partial<ScopeStore> & Pick<ScopeStore, "scopes">;
