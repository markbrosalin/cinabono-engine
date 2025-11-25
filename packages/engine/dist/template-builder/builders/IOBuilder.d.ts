import { CircuitPins, Id, Scope } from "@cnbn/schema";
import { TemplateBuilderDeps } from "../types";
export declare class IOBuilder {
    private readonly deps;
    constructor(deps: Pick<TemplateBuilderDeps, "getItem" | "getLink" | "getScope">);
    buildInputPins(inputIds: Id[], scope: Scope): CircuitPins<"in", "template">;
    buildOutputPins(outputIds: Id[], scope: Scope): CircuitPins<"out", "template">;
    private _buildPins;
    private _ensureToggleLinkedToCircuit;
    private _ensureLampLinkedToCircuit;
}
//# sourceMappingURL=IOBuilder.d.ts.map