import { ApiCtxMeta } from "../../../../api/types/index.js";
import { WithPayloadEv, WithResultEv, WithErrorEv } from "../../types.js";
export interface ApiEventMap extends UC_EventMap, StepEventMap {}
interface UC_EventMap {
    "engine.api.useCase.start": ApiCtxMeta & WithPayloadEv;
    "engine.api.useCase.finish": ApiCtxMeta & WithResultEv;
    "engine.api.useCase.error": ApiCtxMeta & WithErrorEv;
    "engine.api.wrapper.start": ApiCtxMeta &
        WithPayloadEv & {
            wrapperName?: string;
        };
    "engine.api.wrapper.finish": ApiCtxMeta &
        WithResultEv & {
            wrapperName?: string;
        };
    "engine.api.wrapper.error": ApiCtxMeta & WithErrorEv;
    "engine.api.useCaseFn.start": ApiCtxMeta & WithPayloadEv;
    "engine.api.useCaseFn.finish": ApiCtxMeta & WithResultEv;
    "engine.api.useCaseFn.error": ApiCtxMeta & WithErrorEv;
}
type StepBasePayload = {
    useCase: string;
    name: string;
};
interface StepEventMap {
    "engine.api.step.start": StepBasePayload;
    "engine.api.step.finish": StepBasePayload & WithResultEv;
    "engine.api.step.error": StepBasePayload & WithErrorEv;
    "engine.api.rollback.start": StepBasePayload;
    "engine.api.rollback.finish": StepBasePayload;
    "engine.api.rollback.error": StepBasePayload & WithErrorEv;
}
export {};
//# sourceMappingURL=eventMap.d.ts.map
