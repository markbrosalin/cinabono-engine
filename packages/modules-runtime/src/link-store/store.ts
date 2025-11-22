import { InMemoryCrudStore, Size } from "@cnbn/entities-runtime";
import { CrudStore, Exportable } from "@cnbn/entities-runtime";
import { Entries, Id, ItemLink } from "@cnbn/schema";

export type LinkStoreContract = CrudStore<Id, ItemLink> & Exportable<Entries<Id, ItemLink>> & Size;

export class DefaultLinkStore
    extends InMemoryCrudStore<Id, ItemLink>
    implements LinkStoreContract {}
