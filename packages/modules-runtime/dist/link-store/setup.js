import { DefaultLinkStore } from "./store";
export class LinkStoreSetup {
    static init(overrides = {}) {
        const linkMap = overrides.initialLinks ?? new Map();
        const itemStore = overrides.makeLinkStore?.(linkMap) ?? new DefaultLinkStore(linkMap);
        return itemStore;
    }
}
