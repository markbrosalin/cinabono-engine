import type { Graph, Node, NodeProperties } from "@antv/x6";
import { LOGIC_VALUE_CLASSES } from "./constants";
import { Hash, HierarchyPath, KindKey, LogicValue } from "@cnbn/schema";
import { UIEngineServiceName, UIEngineServices } from "../services";

export type UIEngineServiceGetter = <K extends UIEngineServiceName>(name: K) => UIEngineServices[K];

export type UIEngineExternalContext = Record<string, unknown>;

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
