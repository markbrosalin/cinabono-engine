import { DefaultScopeCreator } from "./creator";
export class ScopeFactorySetup {
    static init(overrides = {}) {
        const creator = overrides.makeScopeCreator?.() ?? new DefaultScopeCreator();
        return (args) => creator.create(args);
    }
}
