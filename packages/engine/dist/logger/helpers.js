export const logUseCaseStart = (usecase, logger) => {
    logger?.info?.(`\n======== [BEGIN UseCase] "${usecase}" ========\n\n`);
};
export const logUseCaseEnd = (usecase, logger) => {
    logger?.info?.(`\n======== [END UseCase] "${usecase}" ========\n\n`);
};
export const logStepFailed = (usecase, step, error, logger) => {
    logger?.error?.(`[UseCase] "${usecase}" failed at step ${step}\n`, error);
};
export const logStepCompleted = (step, result, logger) => {
    logger?.info?.(`[UseCase] Step "${step}" completed\n`, result);
};
export const logUseCaseCrashed = (usecase, error, logger) => {
    logger?.error?.(`[UseCase] "${usecase}" crashed\n`, error);
};
export const logRollbackSucceeded = (step, logger) => {
    logger?.info?.(`[UseCase] Rollback "${step}" succeeded\n`);
};
export const logRollbackFailed = (step, error, logger) => {
    logger?.warn?.(`[UseCase] Rollback "${step}" failed\n`, error);
};
