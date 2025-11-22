import * as Schema from "@cnbn/schema";
import * as ItemHelpers from "@cnbn/helpers/item";
import * as Types from "@sim/model/SimulatorStep.types";
import * as SimHelpers from "@sim/helpers";
import { StepSimulatorContract } from "./contract";
import { StepSimulatorDeps, RunConfig } from "@sim/model/config";
import { isComputableItem } from "@cnbn/modules-runtime";

export class DefaultStepSimulator implements StepSimulatorContract {
    constructor(private readonly _deps: StepSimulatorDeps) {}

    public getNow(): Types.Tick {
        return this._deps.timeWheel.getNow();
    }

    public isFinished(): boolean {
        return !this._deps.timeWheel.size;
    }

    public scheduleInput(target: Types.InputCore): Types.SimInputEvent[] {
        const { ctx, timeWheel, genTracker } = this._deps;
        const expanded = SimHelpers.expandInputTargets(ctx, target);

        return expanded.map((param) => {
            const { itemId, pin } = param;
            const maybeLampDelay = SimHelpers.countLampDelay(param, ctx, target.value);

            return timeWheel.schedule({
                ...SimHelpers.makeInputParams(target),
                itemId,
                pin,
                gen: target.gen ?? genTracker.get(itemId, pin),
                t: target.t ?? this.getNow() + maybeLampDelay,
            });
        });
    }

    public scheduleOutput(target: Types.OutputCore): Types.SimOutputEvent[] {
        const { ctx, timeWheel, genTracker } = this._deps;
        const resolved = SimHelpers.resolveOutputDriver(ctx, target);

        return resolved.map(({ itemId, pin }) => {
            return timeWheel.schedule({
                ...SimHelpers.makeOutputParams(target),
                itemId,
                pin,
                gen: target.gen ?? genTracker.get(itemId, pin),
            });
        });
    }

    public runOneTick(options: Partial<RunConfig> = {}): Types.PinUpdate[] {
        const { timeWheel, pinUpdateStore } = this._deps;
        const cfg = SimHelpers.mkRunConfig(options);

        while (true) {
            const events = timeWheel.popCurrentMinDelta();

            if (events.length === 0) break;
            for (const ev of events) this._dispatch(ev, cfg);
        }
        timeWheel.advance();

        const res = pinUpdateStore.getAll();
        pinUpdateStore.clear();
        return res;
    }

    public resetCurrentSession(): void {
        this._deps.genTracker.reset();
    }

    public reset(): void {
        this._deps.genTracker.reset();
        this._deps.timeWheel.reset();
        this._deps.pinUpdateStore.clear();
    }

    private _dispatch(ev: Types.SimEvent, cfg: RunConfig): void {
        if (ev.delta >= cfg.zeroDelayTickThreshold) {
            return ev.kind === "output"
                ? this._handleOutput(this._stabilizeCycle(ev))
                : this._handleInput(ev);
        }
        return ev.kind === "output" ? this._handleOutput(ev) : this._handleInput(ev);
    }

    private _handleInput(ev: Types.SimInputEvent): void {
        const { inHandler, pinUpdateStore, ctx } = this._deps;

        if (inHandler.handle(ev)) {
            SimHelpers.syncCircuitPinValues(ctx.getItem, ev.itemId);

            pinUpdateStore.saveInput(ev);
            this._planOutputs(ev.itemId);
        }
    }

    private _planOutputs(itemId: Schema.Id): void {
        const { getItem, computeService } = this._deps.ctx;

        // skip items without output pins
        const item = getItem(itemId);
        if (!item || !isComputableItem(item)) return;

        const newValues = computeService.computeOuts(item);

        // schedule updating outputs with new values
        newValues.forEach((newValue, pin) => {
            const pinIdx = String(pin);
            const oldValue = ItemHelpers.pinOps(item).output.value.get(pinIdx);

            if (oldValue === newValue) return;

            const delay = SimHelpers.countItemDelay(item, oldValue, newValue);
            this.scheduleOutput({
                itemId,
                pin: pinIdx,
                value: newValue,
                t: this.getNow() + delay,
            });
        });
    }

    private _handleOutput(ev: Types.SimOutputEvent): void {
        const { outHandler, pinUpdateStore, ctx } = this._deps;

        if (outHandler.handle(ev)) {
            SimHelpers.syncCircuitPinValues(ctx.getItem, ev.itemId);

            pinUpdateStore.saveOutput(ev);
            this._fanoutFromDriver(ev);
        }
    }

    private _fanoutFromDriver(ev: Types.OutputCore): Types.SimInputEvent[] {
        const fanouts = SimHelpers.resolveAllReceivers(this._deps.ctx, {
            itemId: ev.itemId,
            pin: ev.pin,
        });
        const result: Types.SimInputEvent[] = [];

        for (const receiver of fanouts) {
            if (!this._deps.ctx.getItem(receiver.itemId)) continue;

            const events = this.scheduleInput({
                itemId: receiver.itemId,
                pin: receiver.pin,
                t: ev.t,
                value: ev.value,
                gen: ev.gen,
                srcItemId: ev.itemId,
                srcOutPin: ev.pin,
            });
            result.push(...events);
        }
        return result;
    }

    public propagateOutput(target: Types.PropagateOutputParams): Types.SimInputEvent[] {
        const resolvedDrivers = SimHelpers.resolveOutputDriver(this._deps.ctx, target);
        const result: Types.SimInputEvent[] = [];

        for (const { itemId, pin } of resolvedDrivers) {
            const driver = this._deps.ctx.getItem(itemId);
            if (!driver || !Schema.hasItemOutputPins(driver)) continue;

            const value = ItemHelpers.pinOps(driver).output.value.get(pin);

            result.push(
                ...this._fanoutFromDriver({
                    itemId,
                    pin,
                    value,
                })
            );
        }
        return result;
    }

    private _stabilizeCycle(ev: Types.SimOutputEvent): Types.SimOutputEvent {
        const gen = this._deps.genTracker.bump(ev.itemId, ev.pin);
        return { ...ev, value: "C", gen };
    }
}
