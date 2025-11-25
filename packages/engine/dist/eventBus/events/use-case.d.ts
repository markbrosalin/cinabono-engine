import { UseCaseCtxMeta } from "../../api/types";
import { WithErrorEv, WithPayload, WithResult } from "../../eventBus/events/shared";
export interface ApiEventMap extends ApiRegistryEvents, FlowToolEvents {
}
export interface ApiRegistryEvents {
    "core.usecase.start": UseCaseCtxMeta & WithPayload;
    "core.usecase.finish": UseCaseCtxMeta & WithResult;
    "core.usecase.error": WithErrorEv & UseCaseCtxMeta;
    "core.wrapper.start": UseCaseCtxMeta & WithPayload & {
        wrapperName?: string;
    };
    "core.wrapper.finish": UseCaseCtxMeta & WithResult & {
        wrapperName?: string;
    };
    "core.usecase.coreFn.start": UseCaseCtxMeta & WithPayload;
    "core.usecase.coreFn.finish": UseCaseCtxMeta & WithResult;
}
export interface FlowToolEvents {
    "core.step.start": {
        name: string;
    };
    "core.step.finish": {
        usecase: string;
        name: string;
    };
    "core.step.error": {
        name: string;
    } & WithErrorEv;
    "core.rollback.start": {
        name: string;
    };
    "core.rollback.finish": {
        usecase: string;
        name: string;
    };
    "core.rollback.error": {
        name: string;
    } & WithErrorEv;
}
//# sourceMappingURL=use-case.d.ts.map