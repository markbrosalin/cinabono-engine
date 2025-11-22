/* eslint-disable @typescript-eslint/no-explicit-any */
import { WithDeepMocks } from "@sim/__tests__/features/types";
import { StepSimulatorDeps } from "@sim/model";
import { vi } from "vitest";

export const mkMockTimeWheel = () =>
    ({
        getNow: vi.fn(() => 0),
        schedule: vi.fn((ev) => ({ ...ev, delta: 0, seq: 1 })),
        popCurrentMinDelta: vi.fn(() => []),
        hasReadyInCurrentSlot: vi.fn(() => false),
        advance: vi.fn(),
        reset: vi.fn(),
        size: 1,
    }) as WithDeepMocks<StepSimulatorDeps["timeWheel"]>;

export const mkMockGenTracker = () =>
    ({
        get: vi.fn(() => 0),
        bump: vi.fn(() => 1),
        reset: vi.fn(),
        same: vi.fn(() => true),
    }) as unknown as WithDeepMocks<StepSimulatorDeps["genTracker"]>;

export const mkMockPinUpdateStore = () =>
    ({
        getAll: vi.fn(() => []),
        clear: vi.fn(),
        saveInput: vi.fn(),
        saveOutput: vi.fn(),
    }) as unknown as WithDeepMocks<StepSimulatorDeps["pinUpdateStore"]>;

export const mkMockCtx = () =>
    ({
        getItem: vi.fn(),
        getScope: vi.fn(),
        getLink: vi.fn(),
        computeService: {
            computeOuts: vi.fn(),
            bakeStore: {} as any,
        },
    }) as unknown as WithDeepMocks<StepSimulatorDeps["ctx"]>;

export const mkMockInHandler = () =>
    ({ handle: vi.fn(() => true) }) as unknown as WithDeepMocks<StepSimulatorDeps["inHandler"]>;

export const mkMockOutHandler = () =>
    ({ handle: vi.fn(() => true) }) as unknown as WithDeepMocks<StepSimulatorDeps["outHandler"]>;
