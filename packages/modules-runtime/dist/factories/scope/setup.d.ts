import { ScopeArgsOfKind, ScopeKind, ScopeOfKind } from "@cnbn/schema";
import { ScopeCreatorContract } from "./creator.js";
export interface ScopeFactoryOverrides {
    makeScopeCreator?: () => ScopeCreatorContract;
}
export type ScopeFactory = <T extends ScopeKind>(args: ScopeArgsOfKind<T>) => ScopeOfKind<T>;
export declare class ScopeFactorySetup {
    static init(overrides?: ScopeFactoryOverrides): ScopeFactory;
}
//# sourceMappingURL=setup.d.ts.map