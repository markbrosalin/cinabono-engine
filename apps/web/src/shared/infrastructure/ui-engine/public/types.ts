import type { Graph, Node } from "@antv/x6";
import type { EngineSignalEvent } from "@gately/shared/types";
import type { Accessor } from "solid-js";
import type {
    NodeHashes,
    PinUpdate,
    UIScopeSnapshot,
    UIEngineTabCloseConditions,
    UIEngineTabCreateInput,
} from "../model";

export type UIEngineAddNodeCommandInput = {
    hash: NodeHashes;
    scopeId: string;
    scopePath: string[];
};

export type UIEngineCreateTabCommandInput = UIEngineTabCreateInput;

export type UIEngineCloseTabCommandConditions = UIEngineTabCloseConditions;

export type UIEngineCommandApi = {
    createTab: (input?: UIEngineCreateTabCommandInput) => Promise<{ tabId: string }>;
    openTab: (tabId?: string) => void;
    canCloseTab: (tabId: string, conditions?: UIEngineCloseTabCommandConditions) => boolean;
    closeTab: (
        tabId: string,
        conditions?: UIEngineCloseTabCommandConditions,
    ) => Promise<boolean>;
    addNode: (input: UIEngineAddNodeCommandInput) => Promise<Node | undefined>;
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
    applyPinPatch: (patch: PinUpdate | PinUpdate[]) => void;
    applySignalEvents: (events: EngineSignalEvent | EngineSignalEvent[]) => void;
};

export type UIEngineWorkspaceCommandApi = Pick<
    UIEngineCommandApi,
    "createTab" | "openTab" | "canCloseTab" | "closeTab"
>;

export type UIEngineRuntimeCommandApi = Omit<
    UIEngineCommandApi,
    keyof UIEngineWorkspaceCommandApi
>;

export type UIEngineStateApi = {
    ready: Accessor<boolean>;
    selectionCount: () => number;
};

export type UIEngineMountApi = {
    setContainer: (container?: HTMLDivElement) => void;
};

export type UIEngineDebugApi = {
    graph: () => Graph | undefined;
};

export type UIEnginePublicApi = {
    mount: UIEngineMountApi;
    state: UIEngineStateApi;
    commands: UIEngineCommandApi;
    debug: UIEngineDebugApi;
};
