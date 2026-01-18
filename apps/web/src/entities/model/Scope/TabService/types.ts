import { ScopeModel, ScopeMetadata } from "../types";

export interface TabScopeModel extends ScopeModel<"tab"> {}

export interface TabScopeMetadata extends Omit<ScopeMetadata<"tab">, "path" | "kind"> {}
