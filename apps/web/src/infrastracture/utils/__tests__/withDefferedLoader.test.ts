// import { describe, it, expect, vi } from "vitest";
// import { withDefferedLoader } from "../withDeferredLoader";

// describe("withDefferedLoader", () => {
//     it("shows loader when action is slow", async () => {
//         vi.useFakeTimers();
//         const show = vi.fn();
//         const promise = withDefferedLoader({
//             action: () => new Promise((r) => setTimeout(() => r(1), 50)),
//             onShowLoader: show,
//             delay: 10,
//         });

//         vi.advanceTimersByTime(20);
//         vi.runAllTimers();

//         const result = await promise;

//         expect(result).toBe(1);
//         expect(show).toHaveBeenCalled();
//         vi.useRealTimers();
//     });

//     it("does not show loader when action fast", async () => {
//         vi.useFakeTimers();
//         const show = vi.fn();
//         const result = await withDefferedLoader({
//             action: () => Promise.resolve(2),
//             onShowLoader: show,
//             delay: 50,
//         });

//         vi.runAllTimers();

//         expect(result).toBe(2);
//         expect(show).not.toHaveBeenCalled();
//         vi.useRealTimers();
//     });
// });
