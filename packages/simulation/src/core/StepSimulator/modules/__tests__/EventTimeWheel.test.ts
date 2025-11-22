import { mkSimInputEvent } from "@sim/__tests__/features/simEvent";
import {
    DefaultEventTimeWheel,
    EventTimeWheelContract,
} from "@sim/core/StepSimulator/modules/EventTimeWheel";
import { inspect } from "util";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@cnbn/utils", () => ({
    uniqueKeyByData: (...args: any[]) => args.join(":"),
}));

describe("DefaultEventTimeWheel", () => {
    let wheel: EventTimeWheelContract;

    beforeEach(() => {
        wheel = new DefaultEventTimeWheel(4); // 4 slots
    });

    it("schedules and pops immediate events", () => {
        const ev = wheel.schedule({
            kind: "input",
            itemId: "A",
            pin: "0",
            value: "1",
        });

        expect(ev.t).toBe(0);
        expect(wheel.size).toBe(1);
        expect(wheel.hasReadyInCurrentSlot()).toBeTruthy();

        const popped = wheel.popCurrentMinDelta();
        expect(popped).toHaveLength(1);
        expect(popped[0]).toMatchObject({
            kind: "input",
            itemId: "A",
            pin: "0",
            value: "1",
            t: 0,
        });

        expect(wheel.size).toBe(0);
    });

    it('advance increases "now" and "cursor"', () => {
        expect(wheel.getNow()).toBe(0);
        wheel.advance();
        expect(wheel.getNow()).toBe(1);
        wheel.advance();
        expect(wheel.getNow()).toBe(2);
    });

    it("schedules future event in correct bucket", () => {
        const ev = wheel.schedule({
            kind: "output",
            itemId: "B",
            pin: "0",
            value: "X",
            t: 5,
        });

        // W = 4, t = 5 => slot 1, round 1
        expect(((ev.t % 4) + 4) % 4).toBe(1);
        expect(wheel.size).toBe(1);
        expect(wheel.hasReadyInCurrentSlot()).toBeFalsy();

        for (let i = 0; i < 5; i++) {
            wheel.hasReadyInCurrentSlot();
            wheel.popCurrentMinDelta();
            wheel.advance();
        }

        expect(wheel.hasReadyInCurrentSlot()).toBeTruthy();
        const popped = wheel.popCurrentMinDelta();
        expect(popped).toHaveLength(1);
        expect(popped[0].t).toBe(5);
    });

    it("last-write-wins replaces previous event", () => {
        const first = wheel.schedule({
            kind: "input",
            itemId: "A",
            pin: "0",
            value: "0",
        });
        const second = wheel.schedule({
            kind: "input",
            itemId: "A",
            pin: "0",
            value: "Z",
        });

        expect(second.seq).toBeGreaterThan(first.seq);
        expect(wheel.size).toBe(1);

        const popped = wheel.popCurrentMinDelta();
        expect(popped).toHaveLength(1);
        expect(popped[0].value).toBe("Z");
    });

    it("reset clears all state", () => {
        wheel.schedule({
            kind: "output",
            itemId: "C",
            pin: "2",
            value: "1",
        });

        wheel.reset();
        expect(wheel.size).toBe(0);
        expect(wheel.getNow()).toBe(0);
    });
});
