export const mkRunConfig = (overrides = {}) => {
    const { zeroDelayTickThreshold = 10000, maxBatchTicks = 64 } = overrides;
    return {
        zeroDelayTickThreshold,
        maxBatchTicks,
    };
};
