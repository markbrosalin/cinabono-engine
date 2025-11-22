import { CrudStore, Exportable } from "@cnbn/entities-runtime";
import { Entries, TemplateOfKind } from "@cnbn/schema";

export interface TemplateLibraryContract
    extends CrudStore<string, TemplateOfKind>,
        Exportable<Entries<string, TemplateOfKind>> {}
