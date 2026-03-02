import { resolveDependencyOrder } from "./resolveDependencyOrder";
import type { ServiceGetter } from "./types";

export type ServiceDefinition<TName extends string, TService> = {
    create: () => TService;
    createDeps?: readonly TName[];
    runtimeDeps?: readonly TName[];
};

export type ServiceDefinitionMap<TName extends string, TServices extends Record<TName, unknown>> = {
    [K in TName]: ServiceDefinition<TName, TServices[K]>;
};

const createRegistryGetter = <TName extends string, TServices extends Record<TName, unknown>>(
    registry: Partial<TServices>,
    label: string,
): ServiceGetter<TName, TServices> => {
    return <K extends TName>(name: K): TServices[K] => {
        const service = registry[name];
        if (!service) {
            throw new Error(`[UIEngine] ${label} "${String(name)}" is not initialized`);
        }

        return service;
    };
};

export const buildServiceRegistry = <
    TName extends string,
    TServices extends Record<TName, unknown>,
>(
    definitions: ServiceDefinitionMap<TName, TServices>,
    options?: {
        label?: string;
        onGetterCreated?: (getter: ServiceGetter<TName, TServices>) => void;
    },
): {
    services: TServices;
    getService: ServiceGetter<TName, TServices>;
} => {
    const registry: Partial<TServices> = {};
    const label = options?.label ?? "service";
    const getService = createRegistryGetter<TName, TServices>(registry, label);

    options?.onGetterCreated?.(getService);

    const orderedDefinitions = resolveDependencyOrder(
        (Object.keys(definitions) as TName[]).map((name) => ({
            name,
            deps: definitions[name].createDeps,
            value: definitions[name],
        })),
    );

    orderedDefinitions.forEach(({ name, value }) => {
        registry[name] = value.create() as TServices[typeof name];
    });

    orderedDefinitions.forEach(({ value }) => {
        value.runtimeDeps?.forEach((name) => {
            getService(name);
        });
    });

    return {
        services: registry as TServices,
        getService,
    };
};
