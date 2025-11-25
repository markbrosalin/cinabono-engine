import { makeUseCaseCtx } from "../../../use-casess/__tests_/fixtures/useCaseDeps";
export function makeCtx(overrides = {}) {
    return { ...makeUseCaseCtx(), ...overrides };
}
export function execUC(UCClass, args, ctx = makeCtx()) {
    const uc = new UCClass(ctx);
    const result = uc.run(args);
    return result;
}
