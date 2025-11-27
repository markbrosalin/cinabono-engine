import { BaseFn } from "./base.js";
export type OverloadsToUnion<F> = F extends {
    (...a: infer A1): infer R1;
    (...a: infer A2): infer R2;
    (...a: infer A3): infer R3;
    (...a: infer A4): infer R4;
    (...a: infer A5): infer R5;
    (...a: infer A6): infer R6;
    (...a: infer A7): infer R7;
    (...a: infer A8): infer R8;
} ? ((...a: A1) => R1) | ((...a: A2) => R2) | ((...a: A3) => R3) | ((...a: A4) => R4) | ((...a: A5) => R5) | ((...a: A6) => R6) | ((...a: A7) => R7) | ((...a: A8) => R8) : never;
export type OverloadedArgs<F> = Parameters<OverloadsToUnion<F>>;
export type OverloadedResult<F, A extends OverloadedArgs<F>> = ReturnType<Extract<OverloadsToUnion<F>, BaseFn<A>>>;
//# sourceMappingURL=overloads.d.ts.map