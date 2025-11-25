import { DefaultItemCreator } from "./creator";
export class ItemFactorySetup {
    static init(overrides = {}) {
        const creator = overrides.makeItemCreator?.() ?? new DefaultItemCreator();
        return (args) => creator.create(args);
    }
}
