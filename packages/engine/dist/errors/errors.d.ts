import { DomainError } from "@cnbn/error";
import { Hash, Id } from "@cnbn/schema";
import { EngineErrorCodes } from "./types.js";
export declare class EngineError extends DomainError<EngineErrorCodes> {
    readonly name = "EngineError";
}
export declare const E: {
    usecase: {
        failed: (usecase: string, step: string, cause: unknown) => EngineError;
    };
    template: {
        NotFound: (hash: Hash) => EngineError;
    };
    tab: {
        NotFound: (id: Id) => EngineError;
    };
    item: {
        NotFound: (id: Id) => EngineError;
        NotDriver: (id: Id) => EngineError;
        NotReceiver: (id: Id) => EngineError;
        NotSameScope: (itemA: Id, itemB: Id, scopeA: Id, scopeB: Id) => EngineError;
        NotToggle: (id: Id) => EngineError;
        NotLamp: (id: Id) => EngineError;
        UnknownArgsKind: (args: unknown) => EngineError;
    };
    scope: {
        NotFound: (id: Id) => EngineError;
    };
    link: {
        NotFound: (id: Id) => EngineError;
    };
};
//# sourceMappingURL=errors.d.ts.map