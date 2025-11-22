import { DomainError } from "@cnbn/error";
import { Hash, Id } from "@cnbn/schema";
import { EngineErrorCodes } from "./types";

export class EngineError extends DomainError<EngineErrorCodes> {
    public readonly name = "EngineError";
}

export const E = {
    usecase: {
        failed: (usecase: string, step: string, cause: unknown) => {
            const err = cause instanceof Error ? cause : new Error(String(cause));
            return new EngineError(
                "engine.usecase",
                "USE_CASE_FAILED",
                `[UseCase] "${usecase}" failed at step ${step}.\nReason: ${err.message}`,
                { usecase, step },
                cause
            );
        },
    },
    template: {
        NotFound: (hash: Hash) =>
            new EngineError(
                "engine.tab",
                "TEMPLATE_NOT_FOUND",
                `Template with hash: "${hash}" not found in store`,
                { hash }
            ),
    },
    tab: {
        NotFound: (id: Id) =>
            new EngineError(
                "engine.tab",
                "TAB_NOT_FOUND",
                `Tab with id: "${id}" not found in store`,
                { id }
            ),
    },
    item: {
        NotFound: (id: Id) =>
            new EngineError(
                "engine.item",
                "ITEM_NOT_FOUND",
                `Item with id: "${id}" not found in store`,
                { id }
            ),
        NotDriver: (id: Id) =>
            new EngineError(
                "engine.item",
                "ITEM_NOT_DRIVER",
                `Item with id: "${id}" has no output pins or items`,
                { id }
            ),
        NotReceiver: (id: Id) =>
            new EngineError(
                "engine.item",
                "ITEM_NOT_RECEIVER",
                `Item with id: "${id}" has no input pins or items`,
                { id }
            ),
        NotSameScope: (itemA: Id, itemB: Id, scopeA: Id, scopeB: Id) =>
            new EngineError(
                "engine.item",
                "ITEMS_NOT_SAME_SCOPE",
                `Items with ids: "${itemA}" and "${itemB}" are not in the same scope`,
                { itemA, itemB, scopeA, scopeB }
            ),
        NotToggle: (id: Id) =>
            new EngineError(
                "engine.item",
                "ITEM_NOT_TOGGLE",
                `Input item with id "${id}" must be toggle`,
                { id }
            ),
        NotLamp: (id: Id) =>
            new EngineError(
                "engine.item",
                "ITEM_NOT_LAMP",
                `Output item with id "${id}" must be lamp`,
                { id }
            ),
        UnknownArgsKind: (args: unknown) =>
            new EngineError(
                "engine.item",
                "UNKNOWN_ITEM_ARGS_KIND",
                `Unknown kind in item build arguments`,
                { args }
            ),
    },
    scope: {
        NotFound: (id: Id) =>
            new EngineError(
                "engine.scope",
                "SCOPE_NOT_FOUND",
                `Scope with id: "${id}" not found in store`,
                { id }
            ),
    },
    link: {
        NotFound: (id: Id) =>
            new EngineError(
                "engine.link",
                "LINK_NOT_FOUND",
                `Link with id: "${id}" not found in store`,
                { id }
            ),
    },
};
