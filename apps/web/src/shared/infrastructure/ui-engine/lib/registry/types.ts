export type ServiceGetter<
    TName extends string,
    TServices extends Record<TName, unknown>,
> = <K extends TName>(name: K) => TServices[K];

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

export const createUninitializedGetter = <TGetter>(message: string): TGetter => {
    return (() => {
        throw new Error(message);
    }) as TGetter;
};
