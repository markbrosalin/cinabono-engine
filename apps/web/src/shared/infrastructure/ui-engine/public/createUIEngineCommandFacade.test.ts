import { describe, expect, it, vi } from "vitest";
import { createUIEngineCommandFacade } from "./createUIEngineCommandFacade";

describe("createUIEngineCommandFacade", () => {
    it("uses workspace commands before runtime is available", async () => {
        const createTab = vi.fn(async () => ({ tabId: "tab-1" }));
        const runtimeGetter = vi.fn(() => {
            throw new Error("runtime should not be called");
        });

        const commands = createUIEngineCommandFacade({
            workspace: {
                createTab,
                openTab: vi.fn(),
                canCloseTab: vi.fn(() => true),
                closeTab: vi.fn(async () => true),
            },
            getRuntime: runtimeGetter,
        });

        await expect(commands.createTab()).resolves.toEqual({ tabId: "tab-1" });
        expect(createTab).toHaveBeenCalled();
        expect(runtimeGetter).not.toHaveBeenCalled();
    });
});
