export const makeDefaultFlowTool = (ucName, bus) => new DefaultFlowTool(ucName, bus);
export class DefaultFlowTool {
    ucName;
    _bus;
    _rollbackStack = [];
    _steps = [];
    constructor(ucName, _bus) {
        this.ucName = ucName;
        this._bus = _bus;
    }
    addStep(name, action, rollback) {
        const startMs = performance.now();
        this._bus?.emit("engine.api.step.start", { name, useCase: this.ucName });
        try {
            const result = action();
            const endMs = performance.now();
            this._bus?.emit("engine.api.step.finish", { useCase: this.ucName, name, result });
            this._steps.push({ name, startMs, endMs, duration: endMs - startMs });
            if (rollback) {
                this._rollbackStack.push({ name, undo: () => rollback(result) });
            }
            return result;
        }
        catch (error) {
            const endMs = performance.now();
            this._steps.push({ name, startMs, endMs, error, duration: endMs - startMs });
            this.addFail(name, error);
        }
    }
    addFail(name, error) {
        this._bus?.emit("engine.api.step.error", { name, useCase: this.ucName, error });
        throw error;
    }
    rollbackSteps() {
        while (this._rollbackStack.length) {
            const { name, undo } = this._rollbackStack.pop();
            this._bus?.emit("engine.api.rollback.start", { name, useCase: this.ucName });
            try {
                undo();
                this._bus?.emit("engine.api.rollback.finish", { useCase: this.ucName, name });
            }
            catch (error) {
                this._bus?.emit("engine.api.rollback.error", { name, error, useCase: this.ucName });
            }
        }
    }
    getTimeline() {
        return this._steps;
    }
    clear() {
        this._steps = [];
    }
}
