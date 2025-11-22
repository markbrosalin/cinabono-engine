export class DomainError<C extends string = string> extends Error {
  constructor(
    public readonly module: string,
    public readonly code: C,
    public readonly message: string,
    public readonly details?: Record<string, unknown>,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = "DomainError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainError);
    }
  }
}
