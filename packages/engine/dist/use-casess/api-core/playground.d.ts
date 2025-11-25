import { ApiRegistryEvents } from "../../eventBus";
export declare const addUC: import("./types").UseCase<{
    readonly label: "adder";
}, (p: {
    a: number;
    b: number;
}) => number, import("./types").ApiTree, "public">;
export declare const doubleUC: import("./types").UseCase<{}, (p: {
    x: number;
}) => any, import("./types").ApiTree, "public">;
export declare const secretUC: import("./types").UseCase<{}, () => "shh", import("./types").ApiTree, "internal">;
export declare const makeFakeBus: () => {
    bus: {
        emit<E extends keyof ApiRegistryEvents>(t: E, d: ApiRegistryEvents[E]): void;
    };
    events: {
        type: keyof ApiRegistryEvents;
        data: any;
    }[];
};
//# sourceMappingURL=playground.d.ts.map