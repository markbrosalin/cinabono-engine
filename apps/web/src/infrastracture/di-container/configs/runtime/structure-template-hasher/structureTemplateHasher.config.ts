import { StructureTemplateHasher } from "@gately/domain-model/shared/structure-template-hasher/structureTemplateHasher";
import { TemplateGraphAnalyzer } from "@gately/domain-model/shared/structure-template-hasher/templateGraphAnalyzer";
import { DIConfig } from "@repo/di";
import { StructureTemplateHasherFactory } from "@gately/domain-model/shared/structure-template-hasher/contracts";
import { StructureTemplateHasherFactoryToken } from "@gately/domain-model/shared/di-tokens/app/tools";

export const structureTemplateHasherConfig = {
    token: StructureTemplateHasherFactoryToken,
    useFactory: () => {
        return (template) =>
            new StructureTemplateHasher(template, new TemplateGraphAnalyzer(template));
    },
} satisfies DIConfig<StructureTemplateHasherFactory>;
