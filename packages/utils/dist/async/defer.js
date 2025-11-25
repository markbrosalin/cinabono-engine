export const waitForNextTick = async (waitMs = 0) => {
    return new Promise((resolve) => setTimeout(resolve, waitMs));
};
