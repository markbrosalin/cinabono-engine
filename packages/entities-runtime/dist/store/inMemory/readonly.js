export class InMemoryReadonlyStore {
    constructor(map = new Map()) {
        this.map = map;
    }
    get(key) {
        return this.map.get(key);
    }
    export() {
        return Array.from(this.map.entries());
    }
    get size() {
        return this.map.size;
    }
}
