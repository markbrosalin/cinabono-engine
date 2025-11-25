import { DefaultTemplateBuilder } from "./builders";
export class TemplateBuilderSetup {
    static init(override = {}) {
        return (deps, args) => {
            const builder = override.makeTempBuilder?.(deps) ??
                new DefaultTemplateBuilder(deps);
            return builder.buildFromSelection(args);
        };
    }
}
