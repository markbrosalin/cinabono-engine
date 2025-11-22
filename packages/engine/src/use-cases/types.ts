export type ElementOf<P> = P extends readonly (infer U)[] ? U : P extends (infer U)[] ? U : P;

export type KindFromPayload<P> =
    ElementOf<P> extends { kind: infer K } ? (K extends string ? K : never) : never;

export type ResultOfMaybeArray<P, R> = P extends readonly unknown[] ? R[] : R;
