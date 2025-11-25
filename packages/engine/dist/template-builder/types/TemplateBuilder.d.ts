import { Id, Read, TemplateOfKind } from "@cnbn/schema";
export interface TemplateBuilderDeps {
    getTemplate: Read<"template">;
    getItem: Read<"item">;
    getScope: Read<"scope">;
    getLink: Read<"link">;
}
export interface TemplateBuilderArgs {
    name: string;
    inputIds: Id[];
    outputIds: Id[];
    logicIds: Id[];
    scopeId: Id;
}
export type TemplateBuilderResult = TemplateOfKind<"circuit:logic">;
//# sourceMappingURL=TemplateBuilder.d.ts.map