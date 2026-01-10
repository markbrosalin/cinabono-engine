import { CircuitTemplate, WithStructureData } from "@repo/schema";

export interface StructureTemplateHasherContract {
    getStructureData(): WithStructureData;
}

export type StructureTemplateHasherFactory = (
    template: CircuitTemplate
) => StructureTemplateHasherContract;
