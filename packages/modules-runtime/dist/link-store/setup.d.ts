import { Id, ItemLink } from "@cnbn/schema";
import { LinkStoreContract } from "./store.js";
export type LinkMap = Map<Id, ItemLink>;
export interface LinkStoreFactoryOverrides {
    initialLinks?: LinkMap;
    makeLinkStore?: (linkMap?: LinkMap) => LinkStoreContract;
}
export declare class LinkStoreSetup {
    static init(overrides?: LinkStoreFactoryOverrides): LinkStoreContract;
}
//# sourceMappingURL=setup.d.ts.map