export interface UCEventMap extends ExecutorToolEvents, FlowToolEvents {
}
export interface ExecutorToolEvents {
    "uc.start": {
        name: string;
        payload: unknown;
    };
    "uc.completed": {
        name: string;
        result: unknown;
    };
    "uc.error": {
        name: string;
        error: unknown;
    };
}
export interface FlowToolEvents {
    "step.start": {
        name: string;
    };
    "step.completed": {
        uc: string;
        name: string;
    };
    "step.failed": {
        name: string;
        error: unknown;
    };
    "rollback.start": {
        name: string;
    };
    "rollback.completed": {
        uc: string;
        name: string;
    };
    "rollback.failed": {
        name: string;
        error: unknown;
    };
}
//# sourceMappingURL=useCase.d.ts.map