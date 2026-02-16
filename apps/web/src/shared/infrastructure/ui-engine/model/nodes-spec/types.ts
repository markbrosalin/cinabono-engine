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

export type NodeSpec = {
    hash: NodeHashes;
    nodeName: string;
    iconPath: string;
    minWidth: number;
    minHeight: number;
};
