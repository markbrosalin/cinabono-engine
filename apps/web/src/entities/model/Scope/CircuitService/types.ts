import { ScopeModel, ScopeMetadata, ScopePath } from "../types";

export interface CircuitScopeModel extends ScopeModel<"circuit"> {}

export interface CircuitScopeMetadata extends ScopeMetadata<"circuit"> {
    id: string;
    path: ScopePath;
}
