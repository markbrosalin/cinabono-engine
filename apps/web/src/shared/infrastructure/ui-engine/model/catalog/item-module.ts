import type { CatalogExtensions, CatalogTimestamps } from "./item";
import type { CatalogItemRef } from "./ref";

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

export type CatalogTimingModule = CatalogModuleBase<
    "timing",
    {
        rise: number;
        fall: number;
    }
>;

export type CatalogCompositionPinRef = {
    itemId: string;
    portId: string;
};

export type CatalogCompositionConnection = {
    from: CatalogCompositionPinRef;
    to: CatalogCompositionPinRef;
};

export type CatalogCompositionInnerItem = {
    id: string;
    ref: CatalogItemRef;
    extensions?: CatalogExtensions;
};

export type CatalogCompositionInputBinding = {
    outerPortId: string;
    targets: CatalogCompositionPinRef[];
};

export type CatalogCompositionOutputBinding = {
    outerPortId: string;
    source: CatalogCompositionPinRef;
};

export type CatalogCompositionModule = CatalogModuleBase<
    "composition",
    {
        items: CatalogCompositionInnerItem[];
        connections: CatalogCompositionConnection[];
        inputBindings: CatalogCompositionInputBinding[];
        outputBindings: CatalogCompositionOutputBinding[];
    }
>;

export type CatalogItemModule =
    | CatalogLogicModule
    | CatalogPortsModule
    | CatalogInteractionModule
    | CatalogTimingModule
    | CatalogCompositionModule;

export type CatalogItemModuleType = CatalogItemModule["type"];
