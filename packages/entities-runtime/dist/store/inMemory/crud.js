import { InMemoryReadUpdateStore } from "./readupdate";
export class InMemoryCrudStore extends InMemoryReadUpdateStore {
    insert(key, value) {
        this.map.set(key, value);
    }
    remove(key) {
        const v = this.get(key);
        return this.map.delete(key) ? v : undefined;
    }
    clear() {
        this.map.clear();
    }
}
