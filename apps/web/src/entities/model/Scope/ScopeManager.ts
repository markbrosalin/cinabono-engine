import { produce, SetStoreFunction } from "solid-js/store";
import * as Scope from "./types";
import { createUniqueId } from "solid-js";
import { ScopeKind } from "@cnbn/schema";

export type ScopeManager = ReturnType<typeof createScopeManager>;

export const createScopeManager = (
    store: Scope.ScopeStore,
    setStore: SetStoreFunction<Scope.ScopeStore>,
) => {
    function addScope<T extends ScopeKind>(data: Scope.ScopeMetadata<T>): Scope.ScopeModel<T> {
        const scope = {
            kind: data.kind,
            path: data.path ?? [],
            name: data.name ?? "New Scope",
            id: data.id ?? createUniqueId(),
            contentJson: data.contentJson ?? "",
            childrenIds: data.childrenIds ?? [],
        };

        setStore("scopes", scope.id, scope);

        return scope;
    }

    function removeScope(id: string): Scope.ScopeModel | undefined {
        const removed = removeWithChildren(id);
        return removed;
    }

    function setActiveScope(id: string): void {
        setStore("activeScopeId", id);
    }

    function getScope(id: string): Scope.ScopeModel | undefined {
        return store.scopes[id];
    }

    function hasScope(id: string): boolean {
        return !!getScope(id);
    }

    function removeWithChildren(id: string): Scope.ScopeModel | undefined {
        let removed: Scope.ScopeModel | undefined;

        setStore(
            produce((store) => {
                removed = store.scopes[id];
                if (!removed) return;

                // Find all children ids
                const idsToDelete = collectChildrenAndRootIds(id, {
                    includeRootId: true,
                });

                // Remove all children scopes
                for (const deleteId of idsToDelete) delete store.scopes[deleteId];
            }),
        );

        return removed;
    }

    function collectChildrenAndRootIds(
        rootId: string,
        props?: { includeRootId?: boolean },
    ): Set<string> {
        const includeRootId = props?.includeRootId === true;
        const resultIds = new Set<string>(includeRootId ? [rootId] : []);

        const walkRecursively = (currentId: string) => {
            // check if scope has children
            const scope = store.scopes[currentId];
            if (!scope?.childrenIds?.length) return;

            // go through children and collect their ids
            for (const childId of scope.childrenIds) {
                if (resultIds.has(childId)) continue;
                resultIds.add(childId);
                walkRecursively(childId);
            }
        };

        walkRecursively(rootId);
        return resultIds;
    }

    function attachChild(parentId: string, childId: string): void {
        const parent = getScope(parentId);
        if (!parent)
            throw new Error(`[createScopeManager.attachChild]: Parent ${parentId} not found`);

        if (parent.childrenIds?.includes(childId)) return;

        setStore("scopes", parentId, "childrenIds", (prev = []) => [...prev, childId]);
    }

    function detachChild(parentId: string, childId: string): void {
        const parent = getScope(parentId);
        if (!parent)
            throw new Error(`[createScopeManager.detachChild]: Parent ${parentId} not found`);

        if (!parent.childrenIds?.length) return;

        setStore("scopes", parentId, "childrenIds", (prev = []) =>
            prev.filter((id) => id !== childId),
        );
    }

    return {
        addScope,
        setActiveScope,
        hasScope,
        getScope,
        attachChild,
        detachChild,
        collectChildrenAndRootIds,
        removeWithChildren,
        removeScope,
    };
};

// export class ScopeManager implements ScopeManagerContract {
//     constructor(
//         private readonly _store: Scope.ScopeStore,
//         private readonly _setStore: SetStoreFunction<Scope.ScopeStore>,
//     ) {}

//     public AddScope<T extends ScopeKind>(data: Scope.ScopeMetadata<T>): Scope.ScopeModel<T> {
//         const scope = {
//             kind: data.kind,
//             path: data.path ?? [],
//             name: data.name ?? "New Scope",
//             id: data.id ?? createUniqueId(),
//             contentJson: data.contentJson ?? "",
//             childrenIds: data.childrenIds ?? [],
//         };

//         this._setStore("scopes", scope.id, scope);

//         return scope;
//     }

//     public SetActiveScope(id: string): void {
//         this._setStore("activeScopeId", id);
//     }

// public RemoveTab(id: string): Scope.TabScopeModel | undefined {
//     let removed: Scope.ScopeModel<"tab"> | undefined;
//     batch(() => {
//         removed = this._RemoveWithChildren({ id, kind: "tab" });
//     });
//     return removed;
// }

// public GetTab(id: string): Scope.TabScopeModel | undefined {
//     const tab = this.GetById(id);
//     return isTabScopeModel(tab) ? tab : undefined;
// }

// public AddCircuit(data: Scope.CircuitScopeMetadata): Scope.CircuitScopeModel {
//     const circuit: Scope.CircuitScopeModel = {
//         id: data.id,
//         name: data.name ?? "New Circuit",
//         path: data.path,
//         contentJson: data.contentJson ?? "",
//         kind: "circuit",
//         childrenIds: data.childrenIds ?? [],
//     };

//     batch(() => {
//         this._setStore("scopes", circuit.id, circuit); // save to store

//         const parentId = getParentFromPath(circuit.path); // save to parent
//         if (parentId) this._AttachChild(parentId, circuit.id);

//         if (data.options?.setActive === true) this.SetActive(circuit.id); // set active
//     });
//     return circuit;
// }

// public RemoveCircuit(id: string): Scope.CircuitScopeModel | undefined {
//     const scope = this.GetById(id);
//     const parentId = getParentFromPath(scope?.path);
//     let removed: Scope.ScopeModel<"circuit"> | undefined;

//     batch(() => {
//         if (parentId) this._DetachChild(parentId, id); // remove from parent

//         removed = this._RemoveWithChildren({ id, kind: "circuit" }); // remove from
//     });
//     return removed;
// }

// public GetCircuit(id: string): Scope.CircuitScopeModel | undefined {
//     const circuit = this.GetById(id);
//     return isCircuitScopeModel(circuit) ? circuit : undefined;
// }

// public Rename(id: string, value: string): void {
//     try {
//         this._setStore("scopes", id, "name", value);
//     } catch (err) {
//         throw new Error(`[ScopeManager.Rename]: ${err}`);
//     }
// }

// public ToJson(id?: string): string {
//     const exportData: Scope.ExportedScopeStore = { scopes: {} };

//     if (id) {
//         const scope = this.GetById(id);
//         if (!scope) {
//             throw new Error(
//                 `[ScopeManager.ToJson]: Couldn't export to JSON. Scope with ${id} is undefined.`,
//             );
//         }

//         const idsToExport = this._CollectChildrenAndRootIds(id, { includeRootId: true });

//         for (const scopeId of idsToExport) {
//             const s = this.GetById(scopeId);
//             if (s) exportData.scopes[scopeId] = s;
//         }
//     } else {
//         Object.assign(exportData, this._store);
//     }

//     return JSON.stringify(exportData);
// }

// public FromJson(json: string): void {
//     const data = JSON.parse(json) as Scope.ExportedScopeStore;

//     this._setStore(
//         produce((store) => {
//             if (data.scopes) {
//                 store.scopes = { ...store.scopes, ...data.scopes };
//             }

//             if (data.activeScopeId) {
//                 store.activeScopeId = data.activeScopeId;
//             }
//         }),
//     );
// }

// public UpdateContent(id: string, value: string): void {
//     try {
//         this._setStore("scopes", id, "contentJson", value);
//     } catch (err) {
//         throw new Error(`[ScopeManager.UpdateContent]: ${err}`);
//     }
// }

// public ClearContent(id: string): void {
//     try {
//         this._setStore("scopes", id, "contentJson", "");
//     } catch (err) {
//         throw new Error(`[ScopeManager.ClearContent]: ${err}`);
//     }
// }

// public SetActiveScope(id: string): void {
//     this._setStore("activeScopeId", id);
// }

// public Has(id: string): boolean {
//     return !!this.GetById(id);
// }

// public GetById(id: string): Scope.ScopeModel | undefined {
//     return this._store.scopes[id];
// }

// private _RemoveWithChildren<K extends Scope.ScopeKind>(data: {
//     id: string;
//     kind: K;
// }): Scope.ScopeModel<K> | undefined {
//     let removed: Scope.ScopeModel | undefined;

//     this._setStore(
//         produce((store) => {
//             removed = store.scopes[data.id];
//             if (!removed || removed.kind !== data.kind) return;

//             // Find all children ids
//             const idsToDelete = this._CollectChildrenAndRootIds(data.id, {
//                 includeRootId: true,
//             });

//             // Remove all children scopes
//             for (const deleteId of idsToDelete) delete store.scopes[deleteId];
//         }),
//     );

//     return removed as Scope.ScopeModel<K>;
// }

// private _CollectChildrenAndRootIds(
//     rootId: string,
//     props?: { includeRootId?: boolean },
// ): Set<string> {
//     const includeRootId = props?.includeRootId === true;
//     const resultIds = new Set<string>(includeRootId ? [rootId] : []);

//     const walkRecursively = (currentId: string) => {
//         const scope = this._store.scopes[currentId];
//         if (!scope?.childrenIds?.length) return;

//         for (const childId of scope.childrenIds) {
//             if (resultIds.has(childId)) continue;
//             resultIds.add(childId);
//             walkRecursively(childId);
//         }
//     };

//     walkRecursively(rootId);
//     return resultIds;
// }

// private _AttachChild(parentId: string, childId: string): void {
//     const parent = this.GetById(parentId);
//     if (!parent)
//         throw new Error(`[ScopeManager._AttachCircuitToTab]: Parent ${parentId} not found`);

//     if (parent.childrenIds?.includes(childId)) return;

//     this._setStore("scopes", parentId, "childrenIds", (prev = []) => [...prev, childId]);
// }

// private _DetachChild(parentId: string, childId: string): void {
//     const parent = this.GetById(parentId);
//     if (!parent)
//         throw new Error(`[ScopeManager._DetachCircuitFromTab]: Parent ${parentId} not found`);

//     if (!parent.childrenIds?.length) return;

//     this._setStore("scopes", parentId, "childrenIds", (prev = []) =>
//         prev.filter((id) => id !== childId),
//     );
// }
// }
