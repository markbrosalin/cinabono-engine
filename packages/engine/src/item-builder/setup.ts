import { ItemArgsOfKind, KindKey } from "@cnbn/schema";
import { DefaultItemBuilder, ItemBuilderContract } from "./builders";
import { ItemBuilderDeps, ItemBuilderResult } from "./types/ItemBuilder";

export interface ItemBuilderFactoryOverride {
    makeItemBuilder?: (deps: ItemBuilderDeps) => ItemBuilderContract;
}

export type ItemBuilderFactory = <K extends KindKey>(args: ItemArgsOfKind<K>) => ItemBuilderResult;

export class ItemBuilderSetup {
    static init(
        deps: ItemBuilderDeps,
        override: ItemBuilderFactoryOverride = {}
    ): ItemBuilderFactory {
        const builder = override.makeItemBuilder?.(deps) ?? new DefaultItemBuilder(deps);
        return (args) => builder.build(args);
    }
}
