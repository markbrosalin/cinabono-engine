import { DIConfig } from "@repo/di/types";
import { libraryServiceConfig } from "./library/library.config";
import { tabServiceConfig } from "./tab.config";
import { sagaConfigs } from "./sagas/index.config";
import { itemBuilderConfig } from "./itemBuilder.config";
import { structureTemplateHasherConfig } from "./structure-template-hasher/structureTemplateHasher.config";
import { computeServiceConfig } from "./compute/compute.config";
import { ctxProviderConfigs } from "./ctx-providers";
import { loggerConfig } from "./logger.config";
import { eventBusConfig } from "./eventBus/eventBus.config";

const serviceConfigs = [tabServiceConfig, libraryServiceConfig, computeServiceConfig];

const independentConfigs = [eventBusConfig, loggerConfig, structureTemplateHasherConfig];

const dependentConfigs = [
    ...serviceConfigs,
    itemBuilderConfig,
    ...ctxProviderConfigs,
    ...sagaConfigs,
];

export const runtimeConfigs = [
    ...independentConfigs,
    ...dependentConfigs,
] satisfies readonly DIConfig<unknown>[];
