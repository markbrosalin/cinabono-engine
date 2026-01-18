import { batch } from "solid-js";
import { CircuitScopeMetadata, CircuitScopeModel } from "./types";
import { ScopeManager } from "../ScopeManager";

export type CircuitService = ReturnType<typeof createCircuitService>;

export const createCircuitService = (scopeManager: ScopeManager) => {
    const addCircuit = (data: CircuitScopeMetadata): CircuitScopeModel => {
        let circuit!: CircuitScopeModel;

        batch(() => {
            circuit = scopeManager.addScope({ ...data, kind: "circuit" });

            if (data.options?.setActive) scopeManager.setActiveScope(circuit.id);
        });

        return circuit;
    };

    return {
        addCircuit,
    };
};
