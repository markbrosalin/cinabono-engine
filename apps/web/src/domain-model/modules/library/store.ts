import { Store } from "@repo/entities-runtime/store";
import { LibraryStoreContract } from "./contract";
import { Template } from "@repo/schema/template";

export class LibraryStore extends Store<string, Template> implements LibraryStoreContract {}
