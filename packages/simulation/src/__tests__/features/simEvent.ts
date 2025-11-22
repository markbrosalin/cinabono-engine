import { SimInputEvent, SimOutputEvent } from "@sim/model";

export const mkSimInputEvent = (ev: Partial<SimInputEvent> = {}): SimInputEvent => {
	return {
		itemId: "A",
		pin: "0",
		value: "1",
		t: 0,
		kind: "input",
		delta: 0,
		seq: 0,
		...ev,
	} as const;
};

export const mkSimOutputEvent = (ev: Partial<SimOutputEvent> = {}): SimOutputEvent => {
	return {
		itemId: "A",
		pin: "0",
		value: "1",
		t: 0,
		kind: "output",
		delta: 0,
		seq: 0,
		...ev,
	} as const;
};
