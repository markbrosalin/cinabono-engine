import { matchPattern } from "./helpers.js";
export class ScopedEventBus {
    constructor(_parent, _allowedPatterns) {
        this._parent = _parent;
        this._allowedPatterns = _allowedPatterns;
    }
    on(pattern, callback) {
        if (!this._isAllowedPattern(pattern)) {
            throw new Error(`Pattern "${pattern}" not allowed in this scope`);
        }
        return this._parent.on(pattern, callback);
    }
    once(pattern, callback) {
        if (!this._isAllowedPattern(pattern)) {
            throw new Error(`Pattern "${pattern}" not allowed in this scope`);
        }
        return this._parent.once(pattern, callback);
    }
    emit(event, payload) {
        if (!this._isAllowedPattern(event)) {
            throw new Error(`Event "${event}" not allowed in this scope`);
        }
        this._parent.emit(event, payload);
    }
    off(pattern, callback) {
        if (!this._isAllowedPattern(pattern)) {
            throw new Error(`Pattern "${pattern}" not allowed in this scope`);
        }
        this._parent.off(pattern, callback);
    }
    _isAllowedPattern(pattern) {
        for (const allowedPattern of this._allowedPatterns) {
            if (matchPattern(pattern, allowedPattern))
                return true;
        }
        return false;
    }
}
