export class DomainError extends Error {
    module;
    code;
    message;
    details;
    cause;
    constructor(module, code, message, details, cause) {
        super(message);
        this.module = module;
        this.code = code;
        this.message = message;
        this.details = details;
        this.cause = cause;
        this.name = "DomainError";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DomainError);
        }
    }
}
