import { DefaultItemBuilder } from "./builders";
export class ItemBuilderSetup {
    static init(deps, override = {}) {
        const builder = override.makeItemBuilder?.(deps) ?? new DefaultItemBuilder(deps);
        return (args) => builder.build(args);
    }
}
