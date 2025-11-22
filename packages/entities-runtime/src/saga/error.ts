export class SagaError extends Error {
    constructor(
        public readonly step: string,
        public readonly cause?: unknown
    ) {
        super();
        this.name = "SagaError";
    }
}
