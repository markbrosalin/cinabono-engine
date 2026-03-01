import type { Graph, Node } from "@antv/x6";
import type { EngineSignalEvent } from "@gately/shared/types";
import type { Accessor } from "solid-js";
import type { NodeHashes, PinUpdate, UIScopeSnapshot } from "../model";

export type UIEngineAddNodeCommandInput = {
    hash: NodeHashes;
    scopeId: string;
    scopePath: string[];
};

export type UIEngineCommandApi = {
    addNode: (input: UIEngineAddNodeCommandInput) => Promise<Node | undefined>;
    exportScopeSnapshot: () => UIScopeSnapshot;
    importScopeSnapshot: (snapshot?: Partial<UIScopeSnapshot> | null) => void;
    applyPinPatch: (patch: PinUpdate | PinUpdate[]) => void;
    applySignalEvents: (events: EngineSignalEvent | EngineSignalEvent[]) => void;
};

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
