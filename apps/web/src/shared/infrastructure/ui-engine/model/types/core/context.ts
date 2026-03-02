/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    UIEngineSharedServiceGetter,
    UIEngineSharedServiceName,
    UIEngineSharedServices,
} from "../../../shared-services";
import type { UIEngineExternalContext } from "./engine";

export type ServiceGetter<
    TName extends string,
    TServices extends Record<TName, unknown>,
> = <K extends TName>(name: K) => TServices[K];

export type ServiceDefinition<TName extends string, TService> = {
    create: () => TService;
    createDeps?: readonly TName[];
    runtimeDeps?: readonly TName[];
};

export type ServiceDefinitionMap<
    TName extends string,
    TServices extends Record<TName, unknown>,
> = {
    [K in TName]: ServiceDefinition<TName, TServices[K]>;
};

export type ServiceContext<
    TExternal extends object,
    TServiceName extends string,
    TServices extends Record<TServiceName, unknown>,
    TSharedName extends string,
    TSharedServices extends Record<TSharedName, unknown>,
> = {
    external: TExternal;
    getService: ServiceGetter<TServiceName, TServices>;
    getSharedService: ServiceGetter<TSharedName, TSharedServices>;
};

export type UIEngineComponentExternal<TExternal extends object = {}> = UIEngineExternalContext &
    TExternal;

export type UIEngineComponentDeps<TExternal extends object = {}> = {
    external: UIEngineComponentExternal<TExternal>;
    getSharedService: UIEngineSharedServiceGetter;
};

export type UIEngineComponentServiceContext<
    TExternal extends object,
    TServiceName extends string,
    TServices extends Record<TServiceName, unknown>,
> = ServiceContext<
    UIEngineComponentExternal<TExternal>,
    TServiceName,
    TServices,
    UIEngineSharedServiceName,
    UIEngineSharedServices
>;

export type UIEngineContext = UIEngineComponentServiceContext<{}, string, Record<string, any>>;
