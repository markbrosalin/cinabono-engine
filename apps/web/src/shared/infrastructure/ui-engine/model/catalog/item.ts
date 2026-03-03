import type {
    CatalogInteractionModule,
    CatalogItemModule,
    CatalogLogicModule,
    CatalogPortsModule,
} from "./module";

export type CatalogExtensions = Record<string, unknown>;

export type CatalogTimestamps = {
    createdAt: number;
    updatedAt?: number;
};

export type CatalogItemKind = "logic" | "annotation" | "debug" | "layout";

export type CatalogItemRef = {
    libraryId: string;
    path: string[];
    itemName: string;
};

export type CatalogItemMeta = CatalogTimestamps & {
    title: string;
    description?: string;
    tags?: string[];
    extensions?: CatalogExtensions;
};

export type CatalogItemLayout = {
    width: number;
    height: number;
    minWidth?: number;
    minHeight?: number;
    extensions?: CatalogExtensions;
};

type CatalogItemBase<TKind extends CatalogItemKind, TModules extends CatalogItemModule> = {
    ref: CatalogItemRef;
    kind: TKind;
    meta: CatalogItemMeta;
    layout: CatalogItemLayout;
    modules: TModules[];
    extensions?: CatalogExtensions;
};

export type CatalogLogicItem = CatalogItemBase<
    "logic",
    CatalogLogicModule | CatalogPortsModule | CatalogInteractionModule
>;

export type CatalogAnnotationItem = CatalogItemBase<"annotation", CatalogInteractionModule>;

export type CatalogDebugItem = CatalogItemBase<"debug", CatalogInteractionModule>;

export type CatalogLayoutItem = CatalogItemBase<"layout", CatalogInteractionModule>;

export type CatalogItem =
    | CatalogLogicItem
    | CatalogAnnotationItem
    | CatalogDebugItem
    | CatalogLayoutItem;

export type CatalogItemByKind = {
    logic: CatalogLogicItem;
    annotation: CatalogAnnotationItem;
    debug: CatalogDebugItem;
    layout: CatalogLayoutItem;
};
