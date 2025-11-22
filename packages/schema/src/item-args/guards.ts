import { hasProps } from "../primitives";
import { WithState, WithPath, WithHash, KindKey } from "../shared";
import { getItemCategory } from "../shared/helpers";
import { Args, BaseArgs } from "./types";

type ArgsLike = WithState & WithHash & WithPath;

const hasArgsLikeStructure = (value: unknown): value is ArgsLike =>
    hasProps(value, "hash", "path", "kind", "name");

export const isArgs = (args: unknown): args is Args =>
    hasArgsLikeStructure(args);

export function isArgsOf<K extends KindKey>(
    value: unknown,
    kind: K
): value is Args<K> {
    return isArgs(value) && value.kind === kind;
}

export const isBaseArgs = (args: unknown): args is BaseArgs =>
    isArgs(args) && getItemCategory(args.kind) === "base";

export const isCircuitArgs = (args: unknown) => isArgsOf(args, "circuit:logic");

export const isGeneratorArgs = (args: unknown) =>
    isArgsOf(args, "base:generator");

export const isLogicArgs = (args: unknown) => isArgsOf(args, "base:logic");

export const isDisplayArgs = (args: unknown) => isArgsOf(args, "base:display");
