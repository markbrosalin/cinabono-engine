import { AND_VISUAL } from "./and";
import { BUFFER_VISUAL } from "./buffer";
import { NOT_VISUAL } from "./not";
import { OR_VISUAL } from "./or";
import { NAND_VISUAL } from "./nand";
import { NOR_VISUAL } from "./nor";
import { XOR_VISUAL } from "./xor";
import { XNOR_VISUAL } from "./xnor";
import { TOGGLE_NEW_VISUAL } from "./toggle";
import { LAMP_NEW_VISUAL } from "./lamp/lamp";
import type { AnyVisualBinding } from "../../visual";

export const LOGIC_VISUAL_PRESETS = [
    BUFFER_VISUAL,
    AND_VISUAL,
    OR_VISUAL,
    NOT_VISUAL,
    NAND_VISUAL,
    NOR_VISUAL,
    XOR_VISUAL,
    XNOR_VISUAL,
    TOGGLE_NEW_VISUAL,
    LAMP_NEW_VISUAL,
] as const;

export const DEFAULT_LOGIC_VISUAL_PRESET = BUFFER_VISUAL;

export const getLogicVisualPreset = (hash: string): AnyVisualBinding | undefined =>
    LOGIC_VISUAL_PRESETS.find((binding) => binding.preset.hash === hash);

export {
    AND_VISUAL,
    BUFFER_VISUAL,
    NOT_VISUAL,
    OR_VISUAL,
    NAND_VISUAL,
    NOR_VISUAL,
    XOR_VISUAL,
    XNOR_VISUAL,
    LAMP_NEW_VISUAL,
    TOGGLE_NEW_VISUAL,
};
