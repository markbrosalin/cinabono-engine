import * as Types from "@engine/use-cases/tools/FlowTool/types";

export const makeDefaultFlowTool: Types.FlowToolFactory = (ucName, bus) =>
    new DefaultFlowTool(ucName, bus);

export class DefaultFlowTool implements Types.FlowToolContract {
    private readonly _rollbackStack: Types.RollbackStack = [];
    private _steps: Types.IFlowStepData[] = [];

    constructor(
        protected readonly ucName: string,
        private readonly _bus?: Types.FlowToolEventBus
    ) {}

    public addStep<T>(
        name: Types.StepName,
        action: Types.StepAction<T>,
        rollback?: Types.StepRollback<T>
    ): T {
        const startMs = performance.now();
        this._bus?.emit("api.step.start", { name, useCase: this.ucName });

        try {
            const result = action();

            const endMs = performance.now();
            this._bus?.emit("api.step.finish", { useCase: this.ucName, name, result });

            this._steps.push({ name, startMs, endMs, duration: endMs - startMs });

            if (rollback) {
                this._rollbackStack.push({ name, undo: () => rollback(result) });
            }
            return result;
        } catch (error) {
            const endMs = performance.now();
            this._steps.push({ name, startMs, endMs, error, duration: endMs - startMs });
            this.addFail(name, error);
        }
    }

    public addFail(name: Types.StepName, error: unknown): never {
        this._bus?.emit("api.step.error", { name, useCase: this.ucName, error });
        throw error;
    }

    public rollbackSteps() {
        while (this._rollbackStack.length) {
            const { name, undo } = this._rollbackStack.pop()!;
            this._bus?.emit("api.rollback.start", { name, useCase: this.ucName });
            try {
                undo();
                this._bus?.emit("api.rollback.finish", { useCase: this.ucName, name });
            } catch (error) {
                this._bus?.emit("api.rollback.error", { name, error, useCase: this.ucName });
            }
        }
    }

    public getTimeline(): Types.IFlowStepData[] {
        return this._steps;
    }

    public clear(): void {
        this._steps = [];
    }
}
