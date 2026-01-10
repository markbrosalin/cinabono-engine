// import { describe, expect, it } from "vitest";
// import { canZoom } from "../canZoom";

// describe("canZoom", () => {
//     const limits = { min: 1, max: 3 };

//     it("returns true when zooming in at max", () => {
//         expect(canZoom(-1, 3, limits)).toBe(false);
//     });

//     it("returns true when zooming out at min", () => {
//         expect(canZoom(1, 1, limits)).toBe(false);
//     });

//     it("returns false for in-range zoom", () => {
//         expect(canZoom(-1, 2, limits)).toBe(true);
//         expect(canZoom(1, 2, limits)).toBe(true);
//     });
// });
