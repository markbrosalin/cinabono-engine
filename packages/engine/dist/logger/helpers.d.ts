import { LoggerContract } from "./contract";
export declare const logUseCaseStart: (usecase: string, logger?: LoggerContract) => void;
export declare const logUseCaseEnd: (usecase: string, logger?: LoggerContract) => void;
export declare const logStepFailed: (usecase: string, step: string, error: unknown, logger?: LoggerContract) => void;
export declare const logStepCompleted: (step: string, result: unknown, logger?: LoggerContract) => void;
export declare const logUseCaseCrashed: (usecase: string, error: unknown, logger?: LoggerContract) => void;
export declare const logRollbackSucceeded: (step: string, logger?: LoggerContract) => void;
export declare const logRollbackFailed: (step: string, error: unknown, logger?: LoggerContract) => void;
//# sourceMappingURL=helpers.d.ts.map