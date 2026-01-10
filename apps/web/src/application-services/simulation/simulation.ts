import {
    SimulatorContext,
    SimulationServiceContract,
    SimulationServiceToolsMap,
    SimulationDependencies,
    EmitterStoreContract,
} from "@gately/domain-model/shared/simulation";
import { ToolsService } from "@repo/entities-runtime/service";
import { EventBusContract, events } from "@gately/domain-model/shared/event-bus";
import { loopProcess } from "@repo/utils";
import { Emitter } from "@repo/schema";

export class SimulationService
    extends ToolsService<SimulationServiceToolsMap>
    implements SimulationServiceContract
{
    private readonly _emitters: EmitterStoreContract;
    private readonly _ctx: SimulatorContext;
    private readonly _state: SimulationDependencies["state"];
    private readonly _eventBus: EventBusContract;

    constructor(deps: SimulationDependencies) {
        super({ tools: deps.tools });
        this._ctx = deps.ctx;
        this._state = deps.state;
        this._emitters = deps.ctx.state.emitters;
        this._eventBus = deps.eventBus;
    }

    public get simulator() {
        return this.tools.SIMULATOR;
    }

    public get delay() {
        return this._state.delay;
    }

    public set delay(delay: number) {
        this._state.delay = delay;
    }

    public async start(): Promise<void> {
        this._state.isPaused = false;

        await loopProcess({
            shouldContinue: () => this._emitters.size > 0 && !this._state.isPaused,
            processStep: () => {
                this.nextStep();
            },
            delayMs: () => this._state.delay,
        });
    }

    public stop(): void {
        this._state.isPaused = true;
    }

    public nextStep(): void {
        const updatedItems = this.simulator.simulateSingleStep(this._ctx);

        this._eventBus.emit(events.SimulatedResult, { updatedItems });
    }

    public addToQueue(newEmitter: Emitter[] | Emitter): void {
        this._emitters.insertManyByKey(newEmitter, "id");
    }
    public removeFromQueue(emitters: Emitter[] | Emitter): void {
        this._emitters.updateManyByKey(emitters, "id", (prev, next) => {
            if (!prev) return next;
            const toRemove = new Set(next.pins);

            return {
                id: prev.id,
                pins: prev.pins.filter((pinIndex) => !toRemove.has(pinIndex)),
            };
        });
    }
}
