import { openGlobalOperations, openTabOperations } from "../../../use-cases/steps-helpers";
import { openScopeOperations } from "../../../use-cases/steps-helpers/scope.operations";
export const buildContextOps = (flow, stores) => {
    return {
        globalOps: openGlobalOperations(flow, stores),
        tabOps: openTabOperations(flow),
        scopeOps: openScopeOperations(flow),
    };
};
