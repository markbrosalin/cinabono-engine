export const createUninitializedGetter = <TGetter>(message: string): TGetter => {
    return (() => {
        throw new Error(message);
    }) as TGetter;
};
