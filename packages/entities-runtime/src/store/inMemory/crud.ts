import { CrudStore } from "../contracts";
import { InMemoryReadUpdateStore } from "./readupdate";

export class InMemoryCrudStore<K, V>
	extends InMemoryReadUpdateStore<K, V>
	implements CrudStore<K, V>
{
	public insert(key: K, value: V): void {
		this.map.set(key, value);
	}
	public remove(key: K): V | undefined {
		const v = this.get(key);
		return this.map.delete(key) ? v : undefined;
	}
	public clear(): void {
		this.map.clear();
	}
}
