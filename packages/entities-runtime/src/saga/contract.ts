export interface SagaContract<Payload> {
    execute(payload: Payload): void;
}
