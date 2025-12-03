import { CreateEventMap } from "@cnbn/entities-runtime/eventBus";
import { ApiCtxMeta } from "../../../api/types/index.js";
export interface IApiEvents extends CreateEventMap<"engine.api", ApiEventConfig> {
}
type ApiEventConfig = {
    useCase: {
        base: ApiCtxMeta;
    };
    wrapper: {
        base: ApiCtxMeta & {
            wrapperName?: string;
        };
    };
    useCaseFn: {
        base: ApiCtxMeta;
    };
    step: {
        base: {
            useCase: string;
            name: string;
        };
    };
    rollback: {
        base: {
            useCase: string;
            name: string;
        };
    };
};
export {};
//# sourceMappingURL=apiEvents.d.ts.map