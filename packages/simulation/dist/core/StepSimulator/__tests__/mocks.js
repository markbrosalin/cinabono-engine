import { vi } from "vitest";
export const mkMockTimeWheel = () => ({
    getNow: vi.fn(() => 0),
    schedule: vi.fn((ev) => ({ ...ev, delta: 0, seq: 1 })),
    popCurrentMinDelta: vi.fn(() => []),
    hasReadyInCurrentSlot: vi.fn(() => false),
    advance: vi.fn(),
    reset: vi.fn(),
    size: 1,
});
export const mkMockGenTracker = () => ({
    get: vi.fn(() => 0),
    bump: vi.fn(() => 1),
    reset: vi.fn(),
    same: vi.fn(() => true),
});
export const mkMockPinUpdateStore = () => ({
    getAll: vi.fn(() => []),
    clear: vi.fn(),
    saveInput: vi.fn(),
    saveOutput: vi.fn(),
});
export const mkMockCtx = () => ({
    getItem: vi.fn(),
    getScope: vi.fn(),
    getLink: vi.fn(),
    computeService: {
        computeOuts: vi.fn(),
        bakeStore: {},
    },
});
export const mkMockInHandler = () => ({ handle: vi.fn(() => true) });
export const mkMockOutHandler = () => ({ handle: vi.fn(() => true) });
