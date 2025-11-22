import { hasProps } from "../primitives";
import { WithId, WithPath } from "../shared";
import { CircuitScope, Scope, TabScope, WithKind } from "./types";

type ScopeLike = WithId & WithPath & WithKind;

const hasScopeLikeStructure = (value: unknown): value is ScopeLike => {
  return hasProps(value, "kind", "id", "path");
};

export const isScope = (value: unknown): value is Scope => {
  return (
    hasScopeLikeStructure(value) &&
    hasProps(value, "storedItems", "storedScopes")
  );
};

export const isCircuitScope = (scope: unknown): scope is CircuitScope => {
  return isScope(scope) && scope.kind === "circuit";
};

export const isTabScope = (scope: unknown): scope is TabScope => {
  return isScope(scope) && scope.kind === "tab";
};
