import type { LogicValue } from "@cnbn/schema";
import type { InteractiveNodeAttrs, NodeHashes, NodeSpec } from "../types";
import { AND_SPEC } from "./and";
import { BUFFER_SPEC } from "./buffer";
import { NOT_SPEC } from "./not";
import { OR_SPEC } from "./or";
import { NAND_SPEC } from "./nand";
import { NOR_SPEC } from "./nor";
import { XOR_SPEC } from "./xor";
import { XNOR_SPEC } from "./xnor";
import { TOGGLE_SPEC } from "./toggle";
import { LAMP_SPEC } from "./lamp";

export const LOGIC_NODE_SPECS = [
    BUFFER_SPEC,
    AND_SPEC,
    OR_SPEC,
    NOT_SPEC,
    NAND_SPEC,
    NOR_SPEC,
    XOR_SPEC,
    XNOR_SPEC,
    TOGGLE_SPEC,
    LAMP_SPEC,
] as const;

export const getLogicNodeSpec = (hash: string): NodeSpec | undefined =>
    LOGIC_NODE_SPECS.find((spec) => spec.hash === hash);

export const buildInteractiveNodeAttrs = (
    hash: string,
    value: LogicValue | undefined,
): InteractiveNodeAttrs | undefined => getLogicNodeSpec(hash)?.buildInteractiveAttrs?.(value);

export {
    AND_SPEC,
    BUFFER_SPEC,
    NOT_SPEC,
    OR_SPEC,
    NAND_SPEC,
    NOR_SPEC,
    XOR_SPEC,
    XNOR_SPEC,
    TOGGLE_SPEC,
    LAMP_SPEC,
};

export type BaseLogicHash = NodeHashes;
export type BaseLogicSpec = NodeSpec;
export type { InteractiveNodeAttrs };
