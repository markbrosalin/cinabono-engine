import { buildContextServiceRegistry } from "@gately/shared/infrastructure/ui-engine/lib/registry";
import { createCatalogQueryService } from "./query";
import { createCatalogStateService } from "./state";
import type {
    CatalogServiceContext,
    CatalogServiceDefinitions,
    CatalogServiceName,
    CatalogServices,
} from "./types";

/** Builds the local service graph for the catalog component. */
const createServiceDefinitions = (ctx: CatalogServiceContext): CatalogServiceDefinitions => ({
    state: {
        create: () => createCatalogStateService(),
    },
    query: {
        create: () => createCatalogQueryService(ctx),
        createDeps: ["state"],
    },
});

export const buildCatalogServices = (ctx: CatalogServiceContext): CatalogServices => {
    const definitions = createServiceDefinitions(ctx);
    const { services } = buildContextServiceRegistry<CatalogServiceName, CatalogServices>(
        definitions,
        {
            label: "catalog service",
            ctx,
        },
    );

    return services;
};
