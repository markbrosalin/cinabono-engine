import { hasProps } from "../primitives";
import { ScopeKind, WithKind } from "../scope/types";
import { ScopeArgsOfKind } from "../shared";
import { CircuitScopeArgs, TabScopeArgs } from "./types";

type ScopeArgsLike = WithKind;

const hasScopeLikeStructure = (value: unknown): value is ScopeArgsLike => {
    return hasProps(value, "kind");
};

export const isScopeArgs = (
    value: unknown
): value is ScopeArgsOfKind<ScopeKind> => {
    return hasScopeLikeStructure(value);
};

export const isTabScopeArgs = (args: unknown): args is TabScopeArgs => {
    return isScopeArgs(args) && args.kind === "tab";
};

export const isCircuitScopeArgs = (args: unknown): args is CircuitScopeArgs => {
    return isScopeArgs(args) && args.kind === "circuit";
};
