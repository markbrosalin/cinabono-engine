import { openGlobalOperations, openTabOperations } from "../../../use-cases/operations";
import { openScopeOperations } from "@engine/use-casess/steps-helpers/scope.operations";
export const buildContextOps = (flow, stores) => {
    return {
        globalOps: openGlobalOperations(flow, stores),
        tabOps: openTabOperations(flow),
        scopeOps: openScopeOperations(flow),
    };
};
