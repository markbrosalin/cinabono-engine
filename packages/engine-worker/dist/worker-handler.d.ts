import { CinabonoEngine } from "@cnbn/engine";
export declare class CinabonoWorker {
    private readonly _engine;
    constructor(_engine: CinabonoEngine);
    private readonly _eventHandlers;
    listen(): void;
    private _requestApi;
    private addEvent;
    private removeEvent;
    private mkCallback;
    private _emitReady;
}
//# sourceMappingURL=worker-handler.d.ts.map