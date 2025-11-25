export class SagaError extends Error {
    constructor(step, cause) {
        super();
        this.step = step;
        this.cause = cause;
        this.name = "SagaError";
    }
}
