import type { CatalogExtensions, CatalogItem, CatalogTimestamps } from "./item";

export type CatalogLibraryManifest = CatalogTimestamps & {
    id: string;
    name: string;
    version: string;
    description?: string;
    extensions?: CatalogExtensions;
};

export type CatalogLibraryDocument = {
    manifest: CatalogLibraryManifest;
    items: CatalogItem[];
    extensions?: CatalogExtensions;
};

export type CatalogLibrarySummary = Pick<CatalogLibraryManifest, "id" | "name" | "version">;

export type CatalogDocument = {
    libraries: CatalogLibraryDocument[];
    extensions?: CatalogExtensions;
};
