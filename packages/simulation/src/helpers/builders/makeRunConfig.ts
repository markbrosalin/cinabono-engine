import { RunConfig } from "@sim/model";

export const mkRunConfig = (overrides: Partial<RunConfig> = {}): RunConfig => {
	const { zeroDelayTickThreshold = 10000, maxBatchTicks = 64 } = overrides;

	return {
		zeroDelayTickThreshold,
		maxBatchTicks,
	};
};
