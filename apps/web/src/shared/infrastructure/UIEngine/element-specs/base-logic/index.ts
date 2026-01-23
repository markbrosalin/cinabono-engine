import { BaseLogicHash, BaseLogicSpec } from "@gately/shared/infrastructure";
import { AND_SPEC } from "./and";
import { BUFFER_SPEC } from "./buffer";
import { NOT_SPEC } from "./not";
import { OR_SPEC } from "./or";
import { NAND_SPEC } from "./nand";
import { NOR_SPEC } from "./nor";
import { XOR_SPEC } from "./xor";
import { XNOR_SPEC } from "./xnor";

export const BASE_LOGIC_SPECS = [
    BUFFER_SPEC,
    AND_SPEC,
    OR_SPEC,
    NOT_SPEC,
    NAND_SPEC,
    NOR_SPEC,
    XOR_SPEC,
    XNOR_SPEC,
] as const;

export const getBaseLogicSpec = (hash: string): BaseLogicSpec | undefined =>
    BASE_LOGIC_SPECS.find((spec) => spec.hash === hash);

export { AND_SPEC, BUFFER_SPEC, NOT_SPEC, OR_SPEC, NAND_SPEC, NOR_SPEC, XOR_SPEC, XNOR_SPEC };
export type { BaseLogicHash, BaseLogicSpec };
