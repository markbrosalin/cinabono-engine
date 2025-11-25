import { InMemoryReadonlyStore } from "./readonly";
export class InMemoryReadUpdateStore extends InMemoryReadonlyStore {
    update(key, updater) {
        const prev = this.get(key);
        if (!prev)
            return false;
        else
            this.map.set(key, updater(prev));
        return true;
    }
}
