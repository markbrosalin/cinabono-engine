import { Id, ItemLink } from "@cnbn/schema";
import { DefaultLinkStore, LinkStoreContract } from "./store";

export type LinkMap = Map<Id, ItemLink>;

export interface LinkStoreFactoryOverrides {
    initialLinks?: LinkMap;
    makeLinkStore?: (linkMap?: LinkMap) => LinkStoreContract;
}

export class LinkStoreSetup {
    static init(overrides: LinkStoreFactoryOverrides = {}): LinkStoreContract {
        const linkMap = overrides.initialLinks ?? new Map();
        const itemStore = overrides.makeLinkStore?.(linkMap) ?? new DefaultLinkStore(linkMap);

        return itemStore;
    }
}
