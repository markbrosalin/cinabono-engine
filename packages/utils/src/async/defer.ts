export const waitForNextTick = async (waitMs = 0): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, waitMs));
};
