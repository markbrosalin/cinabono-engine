import { mkScope } from "@engine/__tests_/fixtures";
import { DefaultItemCreator } from "@cnbn/modules-runtime/factories";
import { vi } from "vitest";
export function mkItemBuilderDeps() {
    const Item = new DefaultItemCreator();
    const itemFactory = vi.fn((args) => Item.create(args));
    const scopeFactory = vi.fn((args) => mkScope(args));
    const getTemplate = vi.fn();
    return {
        itemFactory,
        scopeFactory,
        getTemplate,
    };
}
