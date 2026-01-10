// import { describe, it, expect } from "vitest";
// import {
//     isEnterClicked,
//     isEscapeClicked,
//     isLeftButton,
//     isMiddleButton,
//     isRightButton,
// } from "../whatButtonClicked";

// describe("whatButtonClicked helpers", () => {
//     it("detects mouse buttons", () => {
//         const left = { button: 0 } as MouseEvent;
//         const middle = { button: 1 } as MouseEvent;
//         const right = { button: 2 } as MouseEvent;

//         expect(isLeftButton(left)).toBe(true);
//         expect(isMiddleButton(middle)).toBe(true);
//         expect(isRightButton(right)).toBe(true);
//     });

//     it("detects keyboard keys", () => {
//         const enter = { key: "Enter" } as KeyboardEvent;
//         const esc = { key: "Escape" } as KeyboardEvent;

//         expect(isEnterClicked(enter)).toBe(true);
//         expect(isEscapeClicked(esc)).toBe(true);
//     });
// });
