import {
    TabScopeMetadata,
    TabScopeModel,
    CircuitScopeMetadata,
    CircuitScopeModel,
    ScopeModel,
} from "./model.types";

export interface ScopeManagerContract {
    /**
     * tab actions
     */

    AddTab(data: TabScopeMetadata): TabScopeModel;
    RemoveTab(id: string): TabScopeModel | undefined;
    GetTab(id: string): TabScopeModel | undefined;

    /**
     * circuit actions
     */
    AddCircuit(data: CircuitScopeMetadata): CircuitScopeModel;
    RemoveCircuit(id: string): CircuitScopeModel | undefined;
    GetCircuit(id: string): CircuitScopeModel | undefined;

    /**
     * common actions
     */

    ToJson(id?: string): string;
    FromJson(json: string): void;

    UpdateContent(id: string, value: string): void;
    ClearContent(id: string): void;

    // Clone(rootId: string, idMap: Record<string, string>): string

    Rename(id: string, value: string): void;
    SetActive(id: string): void;
    Has(id: string): boolean;

    GetById(id: string): ScopeModel | undefined;
}
