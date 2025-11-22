import { SagaError } from ".";
import { SagaLogger, SagaRollback } from "./types";
import { normalizeRecord } from "@cnbn/utils";

export abstract class Saga<Ctx, Payload> {
    private _ctx?: Promise<Ctx>;
    private readonly _rollbackList: SagaRollback[] = [];

    constructor(private readonly _logger?: SagaLogger) {}

    protected abstract buildContext(): Promise<Ctx>;
    protected abstract run(payload: Payload): Promise<void>;

    protected get ctx(): Promise<Ctx> {
        if (!this._ctx) this._ctx = this.buildContext();
        return this._ctx;
    }

    public async execute(payload: Payload): Promise<void> {
        try {
            await this.run(payload);
        } catch (err) {
            await this._rollback();
            this._handleError(err);
            throw err;
        }
    }

    protected async step<T>(
        name: string,
        action: () => Promise<T> | T,
        rollback?: (result: T) => Promise<unknown> | unknown
    ): Promise<T> {
        try {
            const result = await action();
            this._logger?.info?.(`[Saga] Step: "${name}"`, normalizeRecord(result));

            if (rollback) {
                this._rollbackList.push({ name, undo: () => rollback(result) });
            }

            return result;
        } catch (err) {
            throw new SagaError(name, err);
        }
    }

    private async _rollback(): Promise<void> {
        for (const { name, undo } of this._rollbackList.reverse()) {
            try {
                const result = await undo();
                this._logger?.info?.(`[Saga] Rollback: "${name}"`, normalizeRecord(result));
            } catch (undoErr) {
                this._logger?.warn?.(`[Saga] Rollback failed: "${name}"`, undoErr);
            }
        }
    }

    private _handleError(error: unknown) {
        if (error instanceof SagaError) {
            this._logger?.error?.(`[${error.name}] Error on step: "${error.step}"`, error.cause);
        } else {
            this._logger?.error?.(`[Saga] Unknown error`, error);
        }
    }
}
