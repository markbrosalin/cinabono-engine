import { buildServiceRegistry } from "../lib/registry/buildServiceRegistry";
import type { ServiceDefinitionMap, UIEngineHooks } from "../model/types/core";
import { createEventBus, type EventBusServiceContract } from "./event-bus";
import {
    createSnapshotHub,
    type SnapshotHubServiceContract,
} from "./snapshot-hub";

export type UIEngineSharedServices = {
    eventBus: EventBusServiceContract;
    snapshotHub: SnapshotHubServiceContract;
};

export type UIEngineSharedServiceName = keyof UIEngineSharedServices;

export type UIEngineSharedServiceGetter = <K extends UIEngineSharedServiceName>(
    name: K,
) => UIEngineSharedServices[K];

const createSharedServiceDefinitions = (
    hooks?: UIEngineHooks,
): ServiceDefinitionMap<UIEngineSharedServiceName, UIEngineSharedServices> => ({
    eventBus: {
        create: () => createEventBus(hooks),
    },
    snapshotHub: {
        create: () => createSnapshotHub(hooks),
    },
});

export const buildSharedServices = (hooks?: UIEngineHooks) => {
    return buildServiceRegistry<UIEngineSharedServiceName, UIEngineSharedServices>(
        createSharedServiceDefinitions(hooks),
        {
            label: "shared service",
            onLifecycle: hooks?.onLifecycle,
            onError: hooks?.onError,
        },
    );
};
