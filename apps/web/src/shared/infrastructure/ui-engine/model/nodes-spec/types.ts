export type LogicNodeHashes = "BUFFER" | "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR";
export type NodeHashes = LogicNodeHashes;

export type NodeSpec = {
    hash: NodeHashes;
    nodeName: string;
    iconPath: string;
    minWidth: number;
    minHeight: number;
};
