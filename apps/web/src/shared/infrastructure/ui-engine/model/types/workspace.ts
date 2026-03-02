export type UIScopeViewport = {
    zoom: number;
    tx: number;
    ty: number;
};

export type UIScopeSnapshot = {
    contentJson: string;
    viewport: UIScopeViewport;
};

export type UIEngineScopePersistPatch = Partial<UIScopeSnapshot> & {
    _updatedAt?: number;
};

export type UIEngineScope = UIScopeSnapshot & {
    id: string;
    kind: "tab" | "circuit";
    name: string;
    path: string[];
    childrenIds: string[];
    _createdAt: number;
    _updatedAt?: number;
};

export type UIEngineTab = {
    id: string;
    name: string;
};

export type UIEngineTabSession = {
    tabId: string;
    rootScopeId: string;
    navigationPath: string[];
};

export type UIEngineTabCreateInput = Partial<UIScopeSnapshot> & {
    id?: string;
    name?: string;
    childrenIds?: string[];
    options?: {
        setActive?: boolean;
    };
};

export type UIEngineTabCloseConditions = {
    isEditing?: boolean;
};

export type UIEngineTabSessionCreateInput = {
    tabId: string;
    rootScopeId: string;
    navigationPath?: string[];
};
