import * as SimHelpers from "@sim/helpers";
import * as Mocks from "@sim/core/StepSimulator/__tests__/mocks";
import { DefaultStepSimulator } from "@sim/core/StepSimulator/StepSimulator";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mkSimInputEvent } from "@sim/__tests__/features/simEvent";
import { ComputableItem } from "@cnbn/modules-runtime";
import { StepSimulatorDeps } from "@sim/model/config";
import { WithDeepMocks } from "@sim/__tests__/features/types";
import { ItemOfKind } from "@cnbn/schema";
import { OutputCore } from "@sim/model";

describe("DefaultStepSimulator", () => {
    let sim: DefaultStepSimulator;
    let deps: WithDeepMocks<StepSimulatorDeps>;

    beforeEach(() => {
        deps = {
            ctx: Mocks.mkMockCtx(),
            inHandler: Mocks.mkMockInHandler(),
            outHandler: Mocks.mkMockOutHandler(),
            pinUpdateStore: Mocks.mkMockPinUpdateStore(),
            genTracker: Mocks.mkMockGenTracker(),
            timeWheel: Mocks.mkMockTimeWheel(),
        } as const;

        sim = new DefaultStepSimulator(deps);
    });

    it("should schedule input/output correctly", () => {
        vi.spyOn(SimHelpers, "expandInputTargets").mockReturnValue([{ itemId: "A", pin: "0" }]);
        vi.spyOn(SimHelpers, "resolveOutputDriver").mockReturnValue([{ itemId: "A", pin: "0" }]);

        const target = { itemId: "A", pin: "0", t: 5, value: "0" } as const;

        const inEvents = sim.scheduleInput(target);
        const outEvents = sim.scheduleOutput(target);

        expect(deps.timeWheel.schedule).toHaveBeenCalledTimes(2);
        expect(SimHelpers.expandInputTargets).toHaveBeenCalledTimes(1);
        expect(inEvents[0]).toMatchObject({ kind: "input" });
        expect(outEvents[0]).toMatchObject({ kind: "output" });
    });

    it("should call dispatch for events popped from the wheel", () => {
        const ev = mkSimInputEvent({ seq: 1, delta: 0 });
        deps.timeWheel.popCurrentMinDelta.mockReturnValueOnce([ev]).mockReturnValueOnce([]);

        sim.runOneTick({ zeroDelayTickThreshold: 1 });

        expect(deps.inHandler.handle).toHaveBeenCalledWith(ev);
        expect(deps.timeWheel.advance).toHaveBeenCalledTimes(1);
    });

    it("should schedule outputs after input change", () => {
        vi.spyOn(SimHelpers, "expandInputTargets").mockReturnValue([{ itemId: "A", pin: "0" }]);
        vi.spyOn(SimHelpers, "resolveOutputDriver").mockReturnValue([{ itemId: "A", pin: "0" }]);
        deps.ctx.computeService.computeOuts.mockReturnValue(["1"]);

        const item: ComputableItem = {
            id: "A",
            path: [],
            hash: "hash",
            name: "name",
            kind: "base:logic",
            outputPins: { 0: { value: "0" } },
            inputPins: { 0: { value: "0" } },
        };

        deps.ctx.getItem.mockReturnValue(item);

        sim["_handleInput"](mkSimInputEvent({ itemId: "A", pin: "0", value: "0" }));

        expect(deps.pinUpdateStore.saveInput).toHaveBeenCalledTimes(1);
        expect(SimHelpers.resolveOutputDriver).toHaveBeenCalledTimes(1);
        expect(deps.timeWheel.schedule).toHaveBeenCalledTimes(1);
    });

    it("should schedule inputs for all receivers in fanout", () => {
        vi.spyOn(SimHelpers, "resolveAllReceivers").mockReturnValue([
            { itemId: "B", pin: "0" },
            { itemId: "C", pin: "1" },
        ]);
        deps.ctx.getItem.mockReturnValue({} as ItemOfKind);

        const ev: OutputCore = { itemId: "A", pin: "0", value: "1" };

        sim["_fanoutFromDriver"](ev);
        expect(deps.timeWheel.schedule).toHaveBeenCalledTimes(2);
    });

    it("should reset all subcomponents on reset", () => {
        sim.reset();

        expect(deps.genTracker.reset).toHaveBeenCalled();
        expect(deps.timeWheel.reset).toHaveBeenCalled();
        expect(deps.pinUpdateStore.clear).toHaveBeenCalled();
    });
});
