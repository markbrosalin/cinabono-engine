import type { Graph, Node, NodeProperties } from "@antv/x6";
import type { CinabonoClient } from "@cnbn/engine-worker";
import { LOGIC_VALUE_CLASSES } from "./constants";
import { Hash, HierarchyPath, KindKey, LogicValue } from "@cnbn/schema";
import { UIEngineServiceName, UIEngineServices } from "../services";

export type UIEngineServiceGetter = <K extends UIEngineServiceName>(name: K) => UIEngineServices[K];

export type UIEngineLogicEngine = Pick<CinabonoClient, "call">;

export type UIEngineExternalContext = {
    logicEngine?: UIEngineLogicEngine;
    workspaceSession?: UIEngineWorkspaceSessionAdapter;
};

export type UIEngineContext = UIEngineExternalContext & {
    getService: UIEngineServiceGetter;
};

export type UIEnginePlugin = {
    name: string;
    apply: (graph: Graph, ctx: UIEngineContext) => void | (() => void);
};

export type LogicValueClass = (typeof LOGIC_VALUE_CLASSES)[number];

export type PortSide = "left" | "right";
export type PinSide = "input" | "output";
export type PinRef = { side: PinSide; index: string };

export type PortSignalClassUpdate = {
    nodeId: string;
    portId: string;
    signalClass: LogicValueClass;
};
export type PortValueUpdate = { nodeId: string; portId: string; value: LogicValue };
export type PinUpdate = { elementId: string; pinRef: PinRef; value: LogicValue };

export type UIEngineNodeData = { hash: Hash; path: HierarchyPath; kind: KindKey };
export type UIEngineNodeProps = Omit<NodeProperties, "data"> & { data: UIEngineNodeData };

export type UIScopeViewport = { zoom: number; tx: number; ty: number };
export type UIScopeSnapshot = { contentJson: string; viewport: UIScopeViewport };
export type UIEngineScopePersistPatch = Partial<UIScopeSnapshot> & { _updatedAt?: number };

export type UIEngineScopeRecord = {
    id: string;
} & UIScopeSnapshot;

export type UIEngineTabRecord = {
    id: string;
};

export type UIEngineTabSessionRecord = {
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
    options?: {
        setActive?: boolean;
    };
};

export type UIEngineWorkspaceSessionAdapter = {
    addTab: (data: UIEngineTabCreateInput) => UIEngineTabRecord;
    removeTab: (tabId: string) => UIEngineTabRecord | undefined;
    orderedTabs: () => UIEngineTabRecord[];
    activeScopeId: () => string | undefined;
    setActiveScope: (scopeId: string) => void;
    getScope: (scopeId: string) => UIEngineScopeRecord | undefined;
    hasScope: (scopeId: string) => boolean;
    updateScope: (scopeId: string, updates: UIEngineScopePersistPatch) => void;
    activeTabId: () => string | undefined;
    setActiveTab: (tabId?: string) => void;
    getTabSession: (tabId: string) => UIEngineTabSessionRecord | undefined;
    hasTabSession: (tabId: string) => boolean;
    createTabSession: (data: UIEngineTabSessionCreateInput) => UIEngineTabSessionRecord;
    setNavigationPath: (tabId: string, navigationPath: string[]) => void;
    removeTabSession: (tabId: string) => UIEngineTabSessionRecord | undefined;
};

export type EdgeRouterMode = "manhattan" | "metro";

export type EdgeEndpoint = {
    node: Node;
    pin: string;
    portId: string;
};

export type EdgeData = {
    from: EdgeEndpoint;
    to?: EdgeEndpoint;
};
