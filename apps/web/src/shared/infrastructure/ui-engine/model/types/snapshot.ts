export type UIScopeViewport = {
    zoom: number;
    tx: number;
    ty: number;
};

export type UIScopeSnapshotExtensions = Record<string, unknown>;

export type UIScopeSnapshot = {
    contentJson: string;
    viewport: UIScopeViewport;
    extensions?: UIScopeSnapshotExtensions;
};

export type UIEngineScopePersistPatch = Partial<UIScopeSnapshot> & {
    _updatedAt?: number;
};
