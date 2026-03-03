import type { CatalogExtensions, CatalogTimestamps } from "./item";

export type CatalogModuleTimestamps = Partial<CatalogTimestamps>;

export type CatalogPortDirection = "input" | "output";
export type CatalogPortAnchor = "left" | "right" | "top" | "bottom";

export type CatalogPortSpec = {
    id: string;
    direction: CatalogPortDirection;
    title?: string;
    description?: string;
    anchor?: CatalogPortAnchor;
    order?: number;
    offset?: number;
    extensions?: CatalogExtensions;
};

type CatalogModuleBase<TType extends string, TConfig extends object> = CatalogModuleTimestamps & {
    type: TType;
    config: TConfig;
    extensions?: CatalogExtensions;
};

export type CatalogLogicModule = CatalogModuleBase<
    "logic",
    {
        executor: string;
        params?: CatalogExtensions;
    }
>;

export type CatalogPortsModule = CatalogModuleBase<
    "ports",
    {
        items: CatalogPortSpec[];
    }
>;

export type CatalogInteractionModule = CatalogModuleBase<
    "interaction",
    {
        handler: string;
        params?: CatalogExtensions;
    }
>;

export type CatalogItemModule = CatalogLogicModule | CatalogPortsModule | CatalogInteractionModule;

export type CatalogItemModuleType = CatalogItemModule["type"];
