import { TabContract } from "../tab-factory/tab";
import { CrudStore, Exportable, InMemoryCrudStore } from "@cnbn/entities-runtime";
import { Entries, Id } from "@cnbn/schema";
export interface TabStoreContract extends CrudStore<Id, TabContract>, Exportable<Entries<Id, TabContract>> {
}
export declare class DefaultTabStore extends InMemoryCrudStore<Id, TabContract> implements TabStoreContract {
}
//# sourceMappingURL=store.d.ts.map