import { UIScopeSnapshot } from "@gately/shared/infrastructure";
import type { WorkspaceSimulationMode } from "@gately/shared/types";

export interface ScopeStore {
    scopes: Record<string, ScopeModel>;
    tabSessions: Record<string, TabSessionModel>;
    activeScopeId: string | undefined;
    activeTabId: string | undefined;
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

export type TabSessionSimulationState = {
    mode: WorkspaceSimulationMode;
    status: "idle" | "running" | "paused";
};

export type TabSessionSettings = {
    preserveSimulationOnNavigate: boolean;
};

export interface TabSessionModel {
    tabId: string;
    rootScopeId: string;
    navigationPath: ScopePath;
    simulation: TabSessionSimulationState;
    settings: TabSessionSettings;

    _createdAt: number;
    _updatedAt?: number;
}

export interface TabSessionMetadata {
    tabId: string;
    rootScopeId: string;
    navigationPath?: ScopePath;
    simulation?: Partial<TabSessionSimulationState>;
    settings?: Partial<TabSessionSettings>;
    options?: ScopeMetadataOptions;
}

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
