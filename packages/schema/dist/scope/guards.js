import { hasProps } from "../primitives";
const hasScopeLikeStructure = (value) => {
    return hasProps(value, "kind", "id", "path");
};
export const isScope = (value) => {
    return (hasScopeLikeStructure(value) &&
        hasProps(value, "storedItems", "storedScopes"));
};
export const isCircuitScope = (scope) => {
    return isScope(scope) && scope.kind === "circuit";
};
export const isTabScope = (scope) => {
    return isScope(scope) && scope.kind === "tab";
};
