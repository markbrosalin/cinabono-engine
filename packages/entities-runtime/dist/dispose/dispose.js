export class Killable {
    clearDependence(target) {
        target.kill?.();
    }
    clearManyDependencies(object) {
        Object.values(object).forEach((item) => this.clearDependence(item));
    }
    isKillable(obj) {
        return (typeof obj === "object" &&
            obj !== null &&
            "kill" in obj &&
            typeof obj.kill === "function");
    }
    isKillableMap(obj) {
        return typeof obj === "object" && obj !== null && !("kill" in obj);
    }
    clearIfDefined(target) {
        if (this.isKillable(target)) {
            this.clearDependence(target);
        }
        else if (this.isKillableMap(target)) {
            this.clearManyDependencies(target);
        }
    }
}
