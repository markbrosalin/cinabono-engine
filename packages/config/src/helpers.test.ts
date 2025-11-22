import { describe, expect, it } from "vitest";
import { getGlobalCfg, updateGlobalCfg } from "./helpers";

describe("Global config crud helpers", () => {
    it("should update config and return new value", () => {
        const oldValue = getGlobalCfg().useBakedFirst;

        updateGlobalCfg({ useBakedFirst: !oldValue });

        const newValue = getGlobalCfg().useBakedFirst;

        expect(oldValue).toBeDefined();
        expect(newValue).toBeDefined();
        expect(newValue).not.toBe(oldValue);
    });
});
