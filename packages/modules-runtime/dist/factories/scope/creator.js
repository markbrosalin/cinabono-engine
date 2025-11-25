import { uniqueId } from "@cnbn/utils";
export class DefaultScopeCreator {
    create(args) {
        return {
            id: args.id ?? uniqueId(),
            kind: args.kind,
            storedScopes: args.storedScopes ?? new Set(),
            storedItems: args.storedItems ?? new Map(),
            path: args.path ?? [],
        };
    }
}
