import { CircuitPins, InnerItemsMap } from "@cnbn/schema";
import { TemplateBuilderArgs } from "./TemplateBuilder";

export interface StructureBuilderResult {
    inputPins: CircuitPins<"in", "template">;
    outputPins: CircuitPins<"out", "template">;
    items: InnerItemsMap;
}

export type StructureBuilderArgs = Pick<
    TemplateBuilderArgs,
    "inputIds" | "logicIds" | "outputIds" | "scopeId"
>;
