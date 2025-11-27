import { DefaultGenerationTracker, } from "../../../../core/StepSimulator/modules/GenerationTracker/index.js";
import { describe, it, expect, beforeEach } from "vitest";
describe("GenerationTracker", () => {
    let gen;
    beforeEach(() => {
        gen = new DefaultGenerationTracker();
    });
    it("should return 1 as bumped value for a new entry", () => {
        const nextValue = gen.bump("A", "0");
        expect(nextValue).toBe(1);
    });
    it("should bump generation number by 1 for a saved entry", () => {
        gen.bump("A", "0");
        gen.bump("A", "0");
        const nextValue = gen.bump("A", "0");
        expect(nextValue).toBe(3);
    });
    it("should compare generations for equality", () => {
        gen.bump("A", "0");
        gen.bump("B", "0");
        const gen1 = gen.get("A", "0");
        const gen2 = gen.get("B", "0");
        const gen3 = gen.get("C", "0");
        expect(gen1).toBe(gen2);
        expect(gen2).not.toBe(gen3);
    });
    it("should reset to 0 all entries", () => {
        gen.bump("A", "0");
        gen.reset();
        const value = gen.get("A", "0");
        expect(value).toBe(0);
    });
});
