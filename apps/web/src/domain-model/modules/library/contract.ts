import { Store } from "@repo/entities-runtime/store";
import { Template } from "@repo/schema/template";

export interface LibraryServiceContract {
    get store(): LibraryStoreContract;
}

export interface LibraryStoreContract extends Store<string, Template> {}
