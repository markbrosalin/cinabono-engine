import { ApiCtxMeta } from "@engine/api/types";
import { WithPayloadEv, WithResultEv, WithErrorEv } from "@engine/eventBus/events/shared.types";

export interface ApiEventMap extends UC_EventMap, StepEventMap {}

interface UC_EventMap {
    "api.useCase.start": ApiCtxMeta & WithPayloadEv;
    "api.useCase.finish": ApiCtxMeta & WithResultEv;
    "api.useCase.error": ApiCtxMeta & WithErrorEv;

    "api.wrapper.start": ApiCtxMeta & WithPayloadEv & { wrapperName?: string };
    "api.wrapper.finish": ApiCtxMeta & WithResultEv & { wrapperName?: string };
    "api.wrapper.error": ApiCtxMeta & WithErrorEv;

    "api.useCaseFn.start": ApiCtxMeta & WithPayloadEv;
    "api.useCaseFn.finish": ApiCtxMeta & WithResultEv;
    "api.useCaseFn.error": ApiCtxMeta & WithErrorEv;
}

type StepBasePayload = { useCase: string; name: string };

interface StepEventMap {
    "api.step.start": StepBasePayload;
    "api.step.finish": StepBasePayload & WithResultEv;
    "api.step.error": StepBasePayload & WithErrorEv;
    "api.rollback.start": StepBasePayload;
    "api.rollback.finish": StepBasePayload;
    "api.rollback.error": StepBasePayload & WithErrorEv;
}
