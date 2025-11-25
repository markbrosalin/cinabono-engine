import * as Types from "../../../use-cases/tools/FlowTool/types";
export declare const makeDefaultFlowTool: Types.FlowToolFactory;
export declare class DefaultFlowTool implements Types.FlowToolContract {
    protected readonly ucName: string;
    private readonly _bus?;
    private readonly _rollbackStack;
    private _steps;
    constructor(ucName: string, _bus?: Types.FlowToolEventBus | undefined);
    addStep<T>(name: Types.StepName, action: Types.StepAction<T>, rollback?: Types.StepRollback<T>): T;
    addFail(name: Types.StepName, error: unknown): never;
    rollbackSteps(): void;
    getTimeline(): Types.IFlowStepData[];
    clear(): void;
}
//# sourceMappingURL=FlowTool.d.ts.map