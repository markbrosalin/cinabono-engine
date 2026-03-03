import type {
    UIEngineComponentServiceContext,
    ServiceDefinitionMap,
} from "@gately/shared/infrastructure/ui-engine/model/types";
import type { CatalogExternal } from "../types";
import type { CatalogFactoryService } from "./factory";
import type { CatalogQueryService } from "./query";
import type { CatalogStateService } from "./state";

export type CatalogServiceName = "state" | "query" | "factory";

export type CatalogServices = {
    state: CatalogStateService;
    query: CatalogQueryService;
    factory: CatalogFactoryService;
};

export type CatalogServiceDefinitions = ServiceDefinitionMap<CatalogServiceName, CatalogServices>;

export type CatalogServiceContext = UIEngineComponentServiceContext<
    CatalogExternal,
    CatalogServiceName,
    CatalogServices
>;
