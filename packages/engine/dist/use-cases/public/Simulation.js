import { UCBaseExtended } from "../../use-cases/api-core";
export class UCSimulationRun extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "runSimulation";
    }
    run(payload) {
        const tab = this.ctx.globalOps.getTab(payload.tabId);
        const res = tab.ctx.simulation.simulate(payload.runConfig);
        return { simBatch: res };
    }
}
export class UCUpdatePinValue extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "updatePinValue";
    }
    run(payload) {
        const tab = this.ctx.globalOps.getTab(payload.tabId);
        const sim = tab.ctx.simulation;
        const res = payload.type === "input"
            ? sim.updateInput(payload.params)
            : sim.updateOutput(payload.params);
        return { simEvents: res };
    }
}
