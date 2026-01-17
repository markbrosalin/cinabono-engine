import { produce, SetStoreFunction } from "solid-js/store";
import * as Scope from "./model.types";
import { ScopeManagerContract } from "./contract";
import { batch, createUniqueId } from "solid-js";
import { isCircuitScopeModel, isTabScopeModel } from "./model.guards";
import { getParentFromPath } from "./utils";

export class ScopeManager implements ScopeManagerContract {
    constructor(
        private readonly _store: Scope.ScopeStore,
        private readonly _setStore: SetStoreFunction<Scope.ScopeStore>,
    ) {}

    public AddTab(data: Scope.TabScopeMetadata): Scope.TabScopeModel {
        const tab: Scope.TabScopeModel = {
            id: data.id ?? createUniqueId(),
            name: data.name ?? "New Tab",
            path: [],
            contentJson: data.contentJson ?? "",
            kind: "tab",
            childrenIds: data.childrenIds ?? [],
        };

        batch(() => {
            this._setStore("scopes", tab.id, tab);
            if (data.options?.setActive === true) this.SetActive(tab.id);
        });

        return tab;
    }

    public RemoveTab(id: string): Scope.TabScopeModel | undefined {
        const removed = this._RemoveWithChildren({ id, kind: "tab" });
        return removed;
    }

    public GetTab(id: string): Scope.TabScopeModel | undefined {
        const tab = this.GetById(id);
        return isTabScopeModel(tab) ? tab : undefined;
    }

    public AddCircuit(data: Scope.CircuitScopeMetadata): Scope.CircuitScopeModel {
        const circuit: Scope.CircuitScopeModel = {
            id: data.id,
            name: data.name ?? "New Circuit",
            path: data.path,
            contentJson: data.contentJson ?? "",
            kind: "circuit",
            childrenIds: data.childrenIds ?? [],
        };

        batch(() => {
            this._setStore("scopes", circuit.id, circuit); // save to store

            const parentId = getParentFromPath(circuit.path); // save to parent
            if (parentId) this._AttachChild(parentId, circuit.id);

            if (data.options?.setActive === true) this.SetActive(circuit.id); // set active
        });
        return circuit;
    }

    public RemoveCircuit(id: string): Scope.CircuitScopeModel | undefined {
        const scope = this.GetById(id);
        const parentId = getParentFromPath(scope?.path);

        if (parentId) this._DetachChild(parentId, id); // remove from parent

        const removed = this._RemoveWithChildren({ id, kind: "circuit" }); // remove from
        return removed;
    }

    public GetCircuit(id: string): Scope.CircuitScopeModel | undefined {
        const circuit = this.GetById(id);
        return isCircuitScopeModel(circuit) ? circuit : undefined;
    }

    public Rename(id: string, value: string): void {
        try {
            this._setStore("scopes", id, "name", value);
        } catch (err) {
            throw new Error(`[ScopeManager.Rename]: ${err}`);
        }
    }

    public ToJson(id?: string): string {
        const exportData: Scope.ExportedScopeStore = { scopes: {} };

        if (id) {
            const scope = this.GetById(id);
            if (!scope) {
                throw new Error(
                    `[ScopeManager.ToJson]: Couldn't export to JSON. Scope with ${id} is undefined.`,
                );
            }

            const idsToExport = this._CollectChildrenAndRootIds(id, { includeRootId: true });

            for (const scopeId of idsToExport) {
                const s = this.GetById(scopeId);
                if (s) exportData.scopes[scopeId] = s;
            }
        } else {
            Object.assign(exportData, this._store);
        }

        return JSON.stringify(exportData);
    }

    public FromJson(json: string): void {
        const data = JSON.parse(json) as Scope.ExportedScopeStore;

        this._setStore(
            produce((store) => {
                if (data.scopes) {
                    store.scopes = { ...store.scopes, ...data.scopes };
                }

                if (data.activeScopeId) {
                    store.activeScopeId = data.activeScopeId;
                }
            }),
        );
    }

    public UpdateContent(id: string, value: string): void {
        try {
            this._setStore("scopes", id, "contentJson", value);
        } catch (err) {
            throw new Error(`[ScopeManager.UpdateContent]: ${err}`);
        }
    }

    public ClearContent(id: string): void {
        try {
            this._setStore("scopes", id, "contentJson", "");
        } catch (err) {
            throw new Error(`[ScopeManager.ClearContent]: ${err}`);
        }
    }

    public SetActive(id: string): void {
        this._setStore("activeScopeId", id);
    }

    public Has(id: string): boolean {
        return !!this.GetById(id);
    }

    public GetById(id: string): Scope.ScopeModel | undefined {
        return this._store.scopes[id];
    }

    private _RemoveWithChildren<K extends Scope.ScopeKind>(data: {
        id: string;
        kind: K;
    }): Scope.ScopeModel<K> | undefined {
        let removed: Scope.ScopeModel | undefined;

        this._setStore(
            produce((store) => {
                removed = store.scopes[data.id];
                if (!removed || removed.kind !== data.kind) return;

                // Find all children ids
                const idsToDelete = this._CollectChildrenAndRootIds(data.id, {
                    includeRootId: true,
                });

                // Remove all children scopes
                for (const deleteId of idsToDelete) delete store.scopes[deleteId];
            }),
        );

        return removed as Scope.ScopeModel<K>;
    }

    private _CollectChildrenAndRootIds(
        rootId: string,
        props?: { includeRootId?: boolean },
    ): Set<string> {
        const includeRootId = props?.includeRootId === true;
        const resultIds = new Set<string>(includeRootId ? [rootId] : []);

        const walkRecursively = (currentId: string) => {
            const scope = this._store.scopes[currentId];
            if (!scope?.childrenIds?.length) return;

            for (const childId of scope.childrenIds) {
                if (resultIds.has(childId)) continue;
                resultIds.add(childId);
                walkRecursively(childId);
            }
        };

        walkRecursively(rootId);
        return resultIds;
    }

    private _AttachChild(parentId: string, childId: string): void {
        const parent = this.GetById(parentId);
        if (!parent)
            throw new Error(`[ScopeManager._AttachCircuitToTab]: Parent ${parentId} not found`);

        if (parent.childrenIds?.includes(childId)) return;

        this._setStore("scopes", parentId, "childrenIds", (prev = []) => [...prev, childId]);
    }

    private _DetachChild(parentId: string, childId: string): void {
        const parent = this.GetById(parentId);
        if (!parent)
            throw new Error(`[ScopeManager._DetachCircuitFromTab]: Parent ${parentId} not found`);

        if (!parent.childrenIds?.length) return;

        this._setStore("scopes", parentId, "childrenIds", (prev = []) =>
            prev.filter((id) => id !== childId),
        );
    }
}
