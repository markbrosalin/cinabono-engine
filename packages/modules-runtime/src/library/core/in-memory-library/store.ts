import { InMemoryCrudStore } from "@cnbn/entities-runtime";
import { TemplateOfKind } from "@cnbn/schema";
import { TemplateLibraryContract } from "../../contracts";

export class DefaultInMemoryLibraryStore
    extends InMemoryCrudStore<string, TemplateOfKind>
    implements TemplateLibraryContract {}
