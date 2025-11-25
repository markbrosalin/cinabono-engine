"use strict";
// import { Entries, Hash, Template } from "@cnbn/schema";
// import { LibraryContract } from "../contracts";
// import { Store } from "@cnbn/entities-runtime";
// import { HttpTemplateLibraryContract } from "../http/http";
// import { IdbTemplateLibraryContract } from "../idb/idb";
// type CacheLibraryDeps<K, V> = {
//     store: Store<K, V>;
//     http: HttpTemplateLibraryContract<K, V>;
//     idb: IdbTemplateLibraryContract<K, V>;
// };
// export class CacheTemplateLibrary<K extends Hash, V extends Template>
//     implements LibraryContract<K, V>
// {
//     private readonly _store: CacheLibraryDeps<K, V>["store"];
//     private readonly _upstream: CacheLibraryDeps<K, V>["http"];
//     private readonly _cache: CacheLibraryDeps<K, V>["idb"];
//     private constructor(deps: CacheLibraryDeps<K, V>) {
//         this._store = deps.store;
//         this._upstream = deps.http;
//         this._cache = deps.idb;
//     }
//     static async init<K extends Hash, V extends Template>(
//         deps: CacheLibraryDeps<K, V>
//     ): Promise<LibraryContract<K, V>> {
//         const inst = new CacheTemplateLibrary(deps);
//         const cached = await inst._cache.list();
//         inst._store.insertManyByKey(cached, "hash");
//         const fresh = await inst._upstream.list();
//         inst._store.insertManyByKey(fresh, "hash");
//         await Promise.all(fresh.map((v) => inst._cache.upsert?.(v)));
//         return inst;
//     }
//     public async get(hash: K): Promise<V | undefined> {
//         return this._store.get(hash);
//     }
//     public entries(): Entries<K, V> {
//         return this._store.entries();
//     }
//     public async upsert?(entity: V): Promise<void> {
//         this._store.insert(entity.hash, entity);
//         await Promise.all([this._cache.upsert?.(entity), this._upstream.upsert?.(entity)]);
//     }
//     public async remove?(hash: K): Promise<V | undefined> {
//         const removed = this._store.get(hash);
//         await Promise.all([this._cache.remove?.(hash), this._upstream.remove?.(hash)]);
//         if (this._store.remove(hash)) return removed;
//     }
// }
