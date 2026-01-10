import { ItemBuilderFactory } from "@gately/domain-model/shared/item-builder";
import { StructureTemplateHasherFactory } from "@gately/domain-model/shared/structure-template-hasher/contracts";
import { createToken } from "@repo/di/helpers";

export const ItemBuilderFactoryToken = createToken<ItemBuilderFactory>("ItemBuilderFactory");
export const StructureTemplateHasherFactoryToken = createToken<StructureTemplateHasherFactory>(
    "StructureTemplateHasherFactory"
);
