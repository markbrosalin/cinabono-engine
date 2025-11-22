import { CrudStore, Exportable, InMemoryCrudStore, Size } from "@cnbn/entities-runtime";
import { Entries, Id, Scope } from "@cnbn/schema";

export type ScopeStoreContract = CrudStore<Id, Scope> & Exportable<Entries<Id, Scope>> & Size;

export class DefaultScopeStore extends InMemoryCrudStore<Id, Scope> implements ScopeStoreContract {}
