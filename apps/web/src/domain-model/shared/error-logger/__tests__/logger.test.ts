// import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
// import { Logger, LogLevel } from "../logger";
// import { AppError } from "../errors";

// describe("Logger", () => {
//     let devLogger: Logger;
//     let prodLogger: Logger;

//     beforeEach(() => {
//         devLogger = new Logger({ isDev: true });
//         prodLogger = new Logger({ isDev: false });
//     });

//     afterEach(() => {
//         vi.resetAllMocks();
//     });

//     it("logs using console methods for each level", () => {
//         const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
//         const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
//         const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
//         const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

//         devLogger.info("i", { a: 1 });
//         devLogger.warn("w", { a: 2 });
//         devLogger.debug("d", { a: 3 });
//         devLogger.error("e", { a: 4 });

//         expect(infoSpy).toHaveBeenCalledWith("[INFO] i", { a: 1 });
//         expect(warnSpy).toHaveBeenCalledWith("[WARN] w", { a: 2 });
//         expect(debugSpy).toHaveBeenCalledWith("[DEBUG] d", { a: 3 });
//         expect(errorSpy).toHaveBeenCalledWith("[ERROR] e", { a: 4 });
//     });

//     it("fatal throws an error", () => {
//         expect(() => devLogger.fatal("boom")).toThrowError("boom");
//     });

//     it("handles unknown AppError and Error objects", () => {
//         const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
//         const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

//         const appErr = new AppError({ message: "a", level: LogLevel.WARN });
//         devLogger.unknown(appErr);

//         const err = new Error("b");
//         devLogger.unknown(err);

//         devLogger.unknown("c");

//         expect(warnSpy).toHaveBeenCalledWith("[WARN] a");
//         expect(errorSpy).toHaveBeenCalledWith("[ERROR] b", { stack: err.stack });
//         expect(errorSpy).toHaveBeenCalledWith("[ERROR] c");
//     });

//     it("does not log info and debug when not in DEV mode", () => {
//         const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
//         const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

//         prodLogger.info("silent");
//         prodLogger.debug("silent");

//         expect(infoSpy).not.toHaveBeenCalled();
//         expect(debugSpy).not.toHaveBeenCalled();
//     });
// });
