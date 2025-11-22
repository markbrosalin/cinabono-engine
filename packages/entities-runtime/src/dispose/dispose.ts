import { KillableObject, KillableRecord } from "./types";

export class Killable {
    protected clearDependence(target: KillableObject) {
        target.kill?.();
    }

    protected clearManyDependencies(object: KillableRecord) {
        Object.values(object).forEach((item) => this.clearDependence(item));
    }

    protected isKillable(obj: unknown): obj is KillableObject {
        return (
            typeof obj === "object" &&
            obj !== null &&
            "kill" in obj &&
            typeof obj.kill === "function"
        );
    }

    protected isKillableMap(obj: unknown): obj is KillableRecord {
        return typeof obj === "object" && obj !== null && !("kill" in obj);
    }

    public clearIfDefined(target: unknown): void {
        if (this.isKillable(target)) {
            this.clearDependence(target);
        } else if (this.isKillableMap(target)) {
            this.clearManyDependencies(target);
        }
    }
}
