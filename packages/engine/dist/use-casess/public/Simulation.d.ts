import { UCBaseExtended } from "../../use-casess/api-core";
import { Id } from "@repo/schema";
import { RunConfig, RunnerResult, SimInputEvent, SimOutputEvent, UpdateIOParams } from "@repo/simulation";
export declare class UCSimulationRun extends UCBaseExtended {
    name: string;
    run(payload: {
        tabId: Id;
        runConfig: Partial<RunConfig>;
    }): {
        simBatch: RunnerResult;
    };
}
export declare class UCUpdatePinValue extends UCBaseExtended {
    name: string;
    run(payload: {
        type: "output";
        tabId: Id;
        params: UpdateIOParams;
    }): {
        simEvents: SimOutputEvent[];
    };
    run(payload: {
        type: "input";
        tabId: Id;
        params: UpdateIOParams;
    }): {
        simEvents: SimInputEvent[];
    };
}
//# sourceMappingURL=Simulation.d.ts.map