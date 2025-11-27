import { hasProps } from "../primitives/index.js";
import { getItemCategory } from "../shared/helpers.js";
const hasArgsLikeStructure = (value) => hasProps(value, "hash", "path", "kind", "name");
export const isArgs = (args) => hasArgsLikeStructure(args);
export function isArgsOf(value, kind) {
    return isArgs(value) && value.kind === kind;
}
export const isBaseArgs = (args) => isArgs(args) && getItemCategory(args.kind) === "base";
export const isCircuitArgs = (args) => isArgsOf(args, "circuit:logic");
export const isGeneratorArgs = (args) => isArgsOf(args, "base:generator");
export const isLogicArgs = (args) => isArgsOf(args, "base:logic");
export const isDisplayArgs = (args) => isArgsOf(args, "base:display");
