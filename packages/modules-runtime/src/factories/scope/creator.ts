import { ScopeKind } from "@cnbn/schema";
import { ScopeArgsOfKind, ScopeOfKind } from "@cnbn/schema/shared";
import { uniqueId } from "@cnbn/utils";

export interface ScopeCreatorContract {
    create<T extends ScopeKind>(args: ScopeArgsOfKind<T>): ScopeOfKind<T>;
}

export class DefaultScopeCreator implements ScopeCreatorContract {
    public create<T extends ScopeKind>(args: ScopeArgsOfKind<T>): ScopeOfKind<T> {
        return {
            id: args.id ?? uniqueId(),
            kind: args.kind,
            storedScopes: args.storedScopes ?? new Set(),
            storedItems: args.storedItems ?? new Map(),
            path: args.path ?? [],
        };
    }
}
