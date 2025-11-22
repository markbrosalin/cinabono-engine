import { ScopeArgsOfKind, ScopeKind, ScopeOfKind } from "@cnbn/schema";
import { DefaultScopeCreator } from "./creator";
import { ScopeCreatorContract } from "./creator";

export interface ScopeFactoryOverrides {
    makeScopeCreator?: () => ScopeCreatorContract;
}

export type ScopeFactory = <T extends ScopeKind>(args: ScopeArgsOfKind<T>) => ScopeOfKind<T>;

export class ScopeFactorySetup {
    static init(overrides: ScopeFactoryOverrides = {}): ScopeFactory {
        const creator = overrides.makeScopeCreator?.() ?? new DefaultScopeCreator();
        return (args) => creator.create(args);
    }
}
