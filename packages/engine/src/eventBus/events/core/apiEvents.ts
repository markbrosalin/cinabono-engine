import { CreateEventMap } from "@cnbn/entities-runtime/eventBus";
import { ApiCtxMeta } from "@engine/api/types";

export interface IApiEvents extends CreateEventMap<"engine.api", ApiEventConfig> {}

type ApiEventConfig = {
    useCase: { base: ApiCtxMeta };
    wrapper: { base: ApiCtxMeta & { wrapperName?: string } };
    useCaseFn: { base: ApiCtxMeta };
    step: { base: { useCase: string; name: string } };
    rollback: { base: { useCase: string; name: string } };
};
