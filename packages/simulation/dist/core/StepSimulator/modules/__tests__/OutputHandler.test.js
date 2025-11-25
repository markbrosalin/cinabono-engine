import { pinOps } from "@cnbn/helpers";
import { mkSimOutputEvent } from "../../../../__tests__/features/simEvent";
import { DefaultOutputHandler, } from "../../../../core/StepSimulator/modules/InOutHandlers";
import { describe, it, vi, expect, beforeEach } from "vitest";
vi.mock("@cnbn/schema", async () => {
    const actual = await vi.importActual("@cnbn/schema");
    return {
        ...actual,
        hasItemOutputPins: vi.fn().mockReturnValue(true),
    };
});
vi.mock("@cnbn/helpers", async () => {
    return {
        pinOps: vi.fn(() => ({
            output: {
                value: {
                    get: vi.fn().mockReturnValue("1"),
                    set: vi.fn(),
                },
            },
        })),
    };
});
describe("OutputHandler", () => {
    const mockGenTracker = {
        same: vi.fn(),
    };
    const mockCtx = {
        genTracker: mockGenTracker,
        getItem: vi.fn(),
    };
    let handler;
    beforeEach(() => {
        handler = new DefaultOutputHandler(mockCtx);
    });
    it("returns false for old gen of output", () => {
        mockGenTracker.same.mockReturnValue(false);
        const ev = mkSimOutputEvent({ itemId: "itemId", pin: "0", gen: 5 });
        const res = handler.handle(ev);
        expect(res).toBeFalsy();
        expect(mockGenTracker.same).toHaveBeenCalledWith(5, "itemId", "0");
    });
    it("returns false if item not found", () => {
        mockGenTracker.same.mockReturnValue(true);
        mockCtx.getItem.mockReturnValue(undefined);
        const ev = mkSimOutputEvent({ itemId: "missing", pin: "0", value: "1" });
        const res = handler.handle(ev);
        expect(res).toBeFalsy();
        expect(mockCtx.getItem).toHaveBeenCalledWith("missing");
    });
    it("returns false if output value not changed", () => {
        mockGenTracker.same.mockReturnValue(true);
        mockCtx.getItem.mockReturnValue({ id: "itemId" });
        const ev = mkSimOutputEvent({ itemId: "itemId", pin: "0", value: "1" });
        const res = handler.handle(ev);
        expect(res).toBeFalsy();
        expect(pinOps).toHaveBeenCalled();
    });
    it("updates output and returns true if value changed", () => {
        mockGenTracker.same.mockReturnValue(true);
        mockCtx.getItem.mockReturnValue({ id: "itemId" });
        const mockSet = vi.fn();
        pinOps.mockReturnValueOnce({
            output: {
                value: {
                    get: vi.fn().mockReturnValue("0"),
                    set: mockSet,
                },
            },
        });
        const ev = mkSimOutputEvent({ itemId: "itemId", pin: "0", value: "Z" });
        const res = handler.handle(ev);
        expect(res).toBeTruthy();
        expect(mockSet).toHaveBeenCalledWith("0", "Z");
    });
});
