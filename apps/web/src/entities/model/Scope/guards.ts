import { CircuitScopeModel } from "./CircuitService";
import { TabScopeModel } from "./TabService";
import { ScopeModel } from "./types";

export const isTabScopeModel = (scope: ScopeModel | undefined): scope is TabScopeModel => {
    return scope?.kind === "tab";
};

export const isCircuitScopeModel = (scope: ScopeModel | undefined): scope is CircuitScopeModel => {
    return scope?.kind === "circuit";
};
