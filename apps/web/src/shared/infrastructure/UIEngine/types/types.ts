import type { NodeProperties } from "@antv/x6";
import type { Hash, HierarchyPath, KindKey, LogicValue, PinIndex } from "@cnbn/schema";
import type { SignalClass } from "@gately/shared/lib/signal";

export type PortSide = "left" | "right";
export type PinSide = "input" | "output";
export type PinRef = { side: PinSide; index: PinIndex };

export type PortSignalUpdate = { nodeId: string; portId: string; signalClass: SignalClass };
export type PortValueUpdate = { nodeId: string; portId: string; value: LogicValue };
export type PinUpdate = { elementId: string; pinRef: PinRef; value: LogicValue };

export type UIEngineNodeData = { hash: Hash; path: HierarchyPath; kind: KindKey };
export type UIEngineNodeProps = Omit<NodeProperties, "data"> & { data: UIEngineNodeData };

export type UIScopeViewport = { zoom: number; tx: number; ty: number };
export type UIScopeSnapshot = { contentJson: string; viewport: UIScopeViewport };

export type BaseLogicHash = "BUFFER" | "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR";
export type EdgeRouterMode = "manhattan" | "metro";

export type BaseLogicSpec = {
    hash: BaseLogicHash;
    nodeName: string;
    iconPath: string;
    minWidth: number;
    minHeight: number;
};

export type { SignalClass };
