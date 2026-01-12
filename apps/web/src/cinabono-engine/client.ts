import { CinabonoClient } from "@cnbn/engine-worker";
import { AppStates } from "@gately/shared/states";

const engine_worker = new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
});

const CinabonoEngine = new CinabonoClient(engine_worker);

AppStates.setIsEngineReady(await CinabonoEngine.isReady());

export default CinabonoEngine;
