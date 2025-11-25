import { ScopeKind } from "@cnbn/schema";
import { ScopeArgsOfKind, ScopeOfKind } from "@cnbn/schema/shared";
export interface ScopeCreatorContract {
    create<T extends ScopeKind>(args: ScopeArgsOfKind<T>): ScopeOfKind<T>;
}
export declare class DefaultScopeCreator implements ScopeCreatorContract {
    create<T extends ScopeKind>(args: ScopeArgsOfKind<T>): ScopeOfKind<T>;
}
//# sourceMappingURL=creator.d.ts.map