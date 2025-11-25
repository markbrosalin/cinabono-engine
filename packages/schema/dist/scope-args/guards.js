import { hasProps } from "../primitives";
const hasScopeLikeStructure = (value) => {
    return hasProps(value, "kind");
};
export const isScopeArgs = (value) => {
    return hasScopeLikeStructure(value);
};
export const isTabScopeArgs = (args) => {
    return isScopeArgs(args) && args.kind === "tab";
};
export const isCircuitScopeArgs = (args) => {
    return isScopeArgs(args) && args.kind === "circuit";
};
