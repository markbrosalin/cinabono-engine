import { LibraryServiceContract } from "@gately/domain-model/modules/library";
import { TabServiceContract } from "../../container-manager/tab";
import { ComputeServiceContract } from "@gately/domain-model/modules/compute";
import { ItemBuilderFactory } from "../../item-builder";
import { EventBusContract } from "../../event-bus";
import { LoggerContract } from "../../error-logger";
import { StructureTemplateHasherFactory } from "../../structure-template-hasher/contracts";

export interface AppCtx {
    services: AppServices;
    tools: AppTools;
    infra: AppInfra;
}

export interface AppTools {
    itemBuilderFactory: ItemBuilderFactory;
    structureTemplateHasherFactory: StructureTemplateHasherFactory;
}

export interface AppInfra {
    eventBus: EventBusContract;
    logger: LoggerContract;
}

export interface AppServices {
    tabService: TabServiceContract;
    libraryService: LibraryServiceContract;
    computeService: ComputeServiceContract;
}
