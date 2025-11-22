import { pinOps } from "@cnbn/helpers";
import { mkSimInputEvent } from "@sim/__tests__/features/simEvent";
import {
    DefaultInputHandler,
    InputHandlerContract,
} from "@sim/core/StepSimulator/modules/InOutHandlers";
import { describe, it, vi, expect, beforeEach, Mock } from "vitest";

vi.mock("@cnbn/schema", async () => {
    const actual = await vi.importActual("@cnbn/schema");
    return {
        ...actual,
        hasItemInputPins: vi.fn().mockReturnValue(true),
    };
});

vi.mock("@cnbn/helpers", async () => {
    return {
        pinOps: vi.fn(() => ({
            input: {
                value: {
                    get: vi.fn().mockReturnValue("1"),
                    set: vi.fn(),
                },
            },
        })),
    };
});

describe("InputHandler", () => {
    const mockGenTracker = {
        same: vi.fn(),
    };

    const mockCtx = {
        genTracker: mockGenTracker,
        getItem: vi.fn(),
    };

    let handler: InputHandlerContract;

    beforeEach(() => {
        handler = new DefaultInputHandler(mockCtx as any);
    });

    it("returns false for old gen of input", () => {
        mockGenTracker.same.mockReturnValue(false);

        const ev = mkSimInputEvent({ srcItemId: "src", srcOutPin: "0", gen: 5 });

        const res = handler.handle(ev);
        expect(res).toBeFalsy();
        expect(mockGenTracker.same).toHaveBeenCalledWith(5, "src", "0");
    });

    it("returns false if item not found", () => {
        mockGenTracker.same.mockReturnValue(true);
        mockCtx.getItem.mockReturnValue(undefined);

        const ev = mkSimInputEvent({ itemId: "missing", pin: "0", value: "1" });

        const res = handler.handle(ev);
        expect(res).toBeFalsy();
        expect(mockCtx.getItem).toHaveBeenCalledWith("missing");
    });

    it("returns false if input value not changed", () => {
        mockGenTracker.same.mockReturnValue(true);
        mockCtx.getItem.mockReturnValue({ id: "itemId" });

        const ev = mkSimInputEvent({ itemId: "itemId", pin: "0", value: "1" });

        const res = handler.handle(ev);
        expect(res).toBeFalsy();
        expect(pinOps).toHaveBeenCalled();
    });

    it("updates input and returns true if value changed", () => {
        mockGenTracker.same.mockReturnValue(true);
        mockCtx.getItem.mockReturnValue({ id: "itemId" });

        const mockSet = vi.fn();
        (pinOps as Mock).mockReturnValueOnce({
            input: {
                value: {
                    get: vi.fn().mockReturnValue("0"),
                    set: mockSet,
                },
            },
        });

        const ev = mkSimInputEvent({ itemId: "itemId", pin: "0", value: "Z" });

        const res = handler.handle(ev);
        expect(res).toBeTruthy();
        expect(mockSet).toHaveBeenCalledWith("0", "Z");
    });
});
