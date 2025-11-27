import { DefaultScopeCreator } from "./creator.js";
export class ScopeFactorySetup {
    static init(overrides = {}) {
        const creator = overrides.makeScopeCreator?.() ?? new DefaultScopeCreator();
        return (args) => creator.create(args);
    }
}
