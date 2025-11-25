import { KillableObject, KillableRecord } from "./types";
export declare class Killable {
    protected clearDependence(target: KillableObject): void;
    protected clearManyDependencies(object: KillableRecord): void;
    protected isKillable(obj: unknown): obj is KillableObject;
    protected isKillableMap(obj: unknown): obj is KillableRecord;
    clearIfDefined(target: unknown): void;
}
//# sourceMappingURL=dispose.d.ts.map