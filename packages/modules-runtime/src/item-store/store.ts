import { CrudStore, Exportable, InMemoryCrudStore, Size } from "@cnbn/entities-runtime";
import { Entries, Id, ItemOfKind } from "@cnbn/schema";

export type ItemStoreContract = CrudStore<Id, ItemOfKind> &
    Exportable<Entries<Id, ItemOfKind>> &
    Size;
export class DefaultItemStore
    extends InMemoryCrudStore<Id, ItemOfKind>
    implements ItemStoreContract {}
