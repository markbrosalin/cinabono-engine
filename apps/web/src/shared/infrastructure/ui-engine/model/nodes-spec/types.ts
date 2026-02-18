import type { LogicValue } from "@cnbn/schema";

export type LogicNodeHashes =
    | "BUFFER"
    | "AND"
    | "OR"
    | "NOT"
    | "NAND"
    | "NOR"
    | "XOR"
    | "XNOR";

export type GeneratorNodeHashes = "TOGGLE";
export type DisplayNodeHashes = "LAMP";

export type NodeHashes = LogicNodeHashes | GeneratorNodeHashes | DisplayNodeHashes;

export type InteractiveNodeAttrs = Record<string, Record<string, string | number>>;

export type NodeSpec = {
    hash: NodeHashes;
    nodeName: string;
    iconPath: string;
    minWidth: number;
    minHeight: number;
    buildInteractiveAttrs?: (value: LogicValue | undefined) => InteractiveNodeAttrs;
};
