import * as Schema from "@cnbn/schema";
import * as ItemHelpers from "@cnbn/helpers/item";
import * as SimHelpers from "../../helpers";
import { isComputableItem } from "@cnbn/modules-runtime";
export class DefaultStepSimulator {
    constructor(_deps) {
        this._deps = _deps;
    }
    getNow() {
        return this._deps.timeWheel.getNow();
    }
    isFinished() {
        return !this._deps.timeWheel.size;
    }
    scheduleInput(target) {
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
    scheduleOutput(target) {
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
    runOneTick(options = {}) {
        const { timeWheel, pinUpdateStore } = this._deps;
        const cfg = SimHelpers.mkRunConfig(options);
        while (true) {
            const events = timeWheel.popCurrentMinDelta();
            if (events.length === 0)
                break;
            for (const ev of events)
                this._dispatch(ev, cfg);
        }
        timeWheel.advance();
        const res = pinUpdateStore.getAll();
        pinUpdateStore.clear();
        return res;
    }
    resetCurrentSession() {
        this._deps.genTracker.reset();
    }
    reset() {
        this._deps.genTracker.reset();
        this._deps.timeWheel.reset();
        this._deps.pinUpdateStore.clear();
    }
    _dispatch(ev, cfg) {
        if (ev.delta >= cfg.zeroDelayTickThreshold) {
            return ev.kind === "output"
                ? this._handleOutput(this._stabilizeCycle(ev))
                : this._handleInput(ev);
        }
        return ev.kind === "output" ? this._handleOutput(ev) : this._handleInput(ev);
    }
    _handleInput(ev) {
        const { inHandler, pinUpdateStore, ctx } = this._deps;
        if (inHandler.handle(ev)) {
            SimHelpers.syncCircuitPinValues(ctx.getItem, ev.itemId);
            pinUpdateStore.saveInput(ev);
            this._planOutputs(ev.itemId);
        }
    }
    _planOutputs(itemId) {
        const { getItem, computeService } = this._deps.ctx;
        // skip items without output pins
        const item = getItem(itemId);
        if (!item || !isComputableItem(item))
            return;
        const newValues = computeService.computeOuts(item);
        // schedule updating outputs with new values
        newValues.forEach((newValue, pin) => {
            const pinIdx = String(pin);
            const oldValue = ItemHelpers.pinOps(item).output.value.get(pinIdx);
            if (oldValue === newValue)
                return;
            const delay = SimHelpers.countItemDelay(item, oldValue, newValue);
            this.scheduleOutput({
                itemId,
                pin: pinIdx,
                value: newValue,
                t: this.getNow() + delay,
            });
        });
    }
    _handleOutput(ev) {
        const { outHandler, pinUpdateStore, ctx } = this._deps;
        if (outHandler.handle(ev)) {
            SimHelpers.syncCircuitPinValues(ctx.getItem, ev.itemId);
            pinUpdateStore.saveOutput(ev);
            this._fanoutFromDriver(ev);
        }
    }
    _fanoutFromDriver(ev) {
        const fanouts = SimHelpers.resolveAllReceivers(this._deps.ctx, {
            itemId: ev.itemId,
            pin: ev.pin,
        });
        const result = [];
        for (const receiver of fanouts) {
            if (!this._deps.ctx.getItem(receiver.itemId))
                continue;
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
    propagateOutput(target) {
        const resolvedDrivers = SimHelpers.resolveOutputDriver(this._deps.ctx, target);
        const result = [];
        for (const { itemId, pin } of resolvedDrivers) {
            const driver = this._deps.ctx.getItem(itemId);
            if (!driver || !Schema.hasItemOutputPins(driver))
                continue;
            const value = ItemHelpers.pinOps(driver).output.value.get(pin);
            result.push(...this._fanoutFromDriver({
                itemId,
                pin,
                value,
            }));
        }
        return result;
    }
    _stabilizeCycle(ev) {
        const gen = this._deps.genTracker.bump(ev.itemId, ev.pin);
        return { ...ev, value: "C", gen };
    }
}
