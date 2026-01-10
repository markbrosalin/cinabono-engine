export type PayloadMap = Record<string, Record<string, unknown>>;

export type CallbacksMap<P extends PayloadMap> = {
    [K in keyof P]: Array<Callback<P[K]>>;
};

export type Callback<P> = (payload: P) => void;
