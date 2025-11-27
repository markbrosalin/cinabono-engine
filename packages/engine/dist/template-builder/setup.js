import { DefaultTemplateBuilder } from "./builders/index.js";
export class TemplateBuilderSetup {
    static init(override = {}) {
        return (deps, args) => {
            const builder = override.makeTempBuilder?.(deps) ??
                new DefaultTemplateBuilder(deps);
            return builder.buildFromSelection(args);
        };
    }
}
