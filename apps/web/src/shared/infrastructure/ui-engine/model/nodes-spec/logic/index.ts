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
import { TOGGLE_NEW_VISUAL } from "./toggle";
import { LAMP_NEW_VISUAL } from "./lamp";
import type { AnyVisualBinding } from "../../visual";

export const LOGIC_NODE_SPECS = [
    BUFFER_SPEC,
    AND_SPEC,
    OR_SPEC,
    NOT_SPEC,
    NAND_SPEC,
    NOR_SPEC,
    XOR_SPEC,
    XNOR_SPEC,
] as const;

export const getLogicNodeSpec = (hash: string): NodeSpec | undefined =>
    LOGIC_NODE_SPECS.find((spec) => spec.hash === hash);

export const LOGIC_VISUAL_PRESETS = [TOGGLE_NEW_VISUAL, LAMP_NEW_VISUAL] as const;

export const getLogicVisualPreset = (hash: string): AnyVisualBinding | undefined =>
    LOGIC_VISUAL_PRESETS.find((binding) => binding.preset.hash === hash);

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
    LAMP_NEW_VISUAL,
    TOGGLE_NEW_VISUAL,
};

export type BaseLogicHash = NodeHashes;
export type BaseLogicSpec = NodeSpec;
export type { InteractiveNodeAttrs };
