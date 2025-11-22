import { ReadUpdateStore } from "../contracts";
import { InMemoryReadonlyStore } from "./readonly";

export class InMemoryReadUpdateStore<K, V>
	extends InMemoryReadonlyStore<K, V>
	implements ReadUpdateStore<K, V>
{
	update(key: K, updater: (prev: V) => V): boolean {
		const prev = this.get(key);
		if (!prev) return false;
		else this.map.set(key, updater(prev));
		return true;
	}
}
