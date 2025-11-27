import { DefaultItemBuilder } from "./builders/index.js";
export class ItemBuilderSetup {
    static init(deps, override = {}) {
        const builder = override.makeItemBuilder?.(deps) ?? new DefaultItemBuilder(deps);
        return (args) => builder.build(args);
    }
}
