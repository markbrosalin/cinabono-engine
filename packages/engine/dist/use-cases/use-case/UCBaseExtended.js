import { openGlobalOperations, openTabOperations } from "../steps-helpers";
import { openScopeOperations } from "../steps-helpers/scope.operations";
import { UCBase } from "./UCBase";
export class UCBaseExtended extends UCBase {
    constructor(ctx, name) {
        super(ctx, name);
        Object.assign(this.ctx, {
            globalOps: openGlobalOperations(this),
            tabOps: openTabOperations(this),
            scopeOps: openScopeOperations(this),
        });
    }
}
