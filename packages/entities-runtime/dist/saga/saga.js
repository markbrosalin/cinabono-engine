import { SagaError } from "./index.js";
import { normalizeRecord } from "@cnbn/utils";
export class Saga {
    constructor(_logger) {
        this._logger = _logger;
        this._rollbackList = [];
    }
    get ctx() {
        if (!this._ctx)
            this._ctx = this.buildContext();
        return this._ctx;
    }
    async execute(payload) {
        try {
            await this.run(payload);
        }
        catch (err) {
            await this._rollback();
            this._handleError(err);
            throw err;
        }
    }
    async step(name, action, rollback) {
        try {
            const result = await action();
            this._logger?.info?.(`[Saga] Step: "${name}"`, normalizeRecord(result));
            if (rollback) {
                this._rollbackList.push({ name, undo: () => rollback(result) });
            }
            return result;
        }
        catch (err) {
            throw new SagaError(name, err);
        }
    }
    async _rollback() {
        for (const { name, undo } of this._rollbackList.reverse()) {
            try {
                const result = await undo();
                this._logger?.info?.(`[Saga] Rollback: "${name}"`, normalizeRecord(result));
            }
            catch (undoErr) {
                this._logger?.warn?.(`[Saga] Rollback failed: "${name}"`, undoErr);
            }
        }
    }
    _handleError(error) {
        if (error instanceof SagaError) {
            this._logger?.error?.(`[${error.name}] Error on step: "${error.step}"`, error.cause);
        }
        else {
            this._logger?.error?.(`[Saga] Unknown error`, error);
        }
    }
}
