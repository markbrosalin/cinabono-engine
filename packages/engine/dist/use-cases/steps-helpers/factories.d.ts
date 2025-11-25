import { TabContract } from "../../tab-factory";
import { ApiCtx } from "../../use-cases/ApiExecutor";
import { FlowToolContract } from "../../use-cases/tools";
export declare const openGlobalOperations: (flow: FlowToolContract, stores: ApiCtx["stores"]) => {
    getTab: {
        (key: string, safely: false, stepName?: string): unknown;
        (key: string, safely?: true, stepName?: string): unknown;
    };
    getTemplate: {
        (key: string, safely: false, stepName?: string): unknown;
        (key: string, safely?: true, stepName?: string): unknown;
    };
    removeTab: {
        (keys: unknown[], stepName?: string): unknown[];
        (key: unknown, stepName?: string): unknown;
    };
    removeTemplate: {
        (keys: unknown[], stepName?: string): unknown[];
        (key: unknown, stepName?: string): unknown;
    };
    saveTab: (entity: unknown, stepName?: string) => void;
    saveTemplate: (entity: unknown, stepName?: string) => void;
};
export declare const openTabOperations: (flow: FlowToolContract) => (tab: TabContract) => {
    get: {
        item: {
            (key: string, safely: false, stepName?: string): import("@repo/schema").GeneratorItem | import("@repo/schema").DisplayItem | import("@repo/schema").LogicItem | import("@repo/schema").CircuitItem | undefined;
            (key: string, safely?: true, stepName?: string): import("@repo/schema").GeneratorItem | import("@repo/schema").DisplayItem | import("@repo/schema").LogicItem | import("@repo/schema").CircuitItem;
        };
        scope: {
            (key: string, safely: false, stepName?: string): import("@repo/schema").Scope | undefined;
            (key: string, safely?: true, stepName?: string): import("@repo/schema").Scope;
        };
        link: {
            (key: string, safely: false, stepName?: string): import("@repo/schema").ItemLink | undefined;
            (key: string, safely?: true, stepName?: string): import("@repo/schema").ItemLink;
        };
    };
    remove: {
        item: {
            (keys: string[], stepName?: string): (import("@repo/schema").GeneratorItem | import("@repo/schema").DisplayItem | import("@repo/schema").LogicItem | import("@repo/schema").CircuitItem)[];
            (key: string, stepName?: string): import("@repo/schema").GeneratorItem | import("@repo/schema").DisplayItem | import("@repo/schema").LogicItem | import("@repo/schema").CircuitItem | undefined;
        };
        scope: {
            (keys: string[], stepName?: string): import("@repo/schema").Scope[];
            (key: string, stepName?: string): import("@repo/schema").Scope | undefined;
        };
        link: {
            (keys: string[], stepName?: string): import("@repo/schema").ItemLink[];
            (key: string, stepName?: string): import("@repo/schema").ItemLink | undefined;
        };
    };
    save: {
        item: (entity: import("@repo/schema").MaybeArray<import("@repo/schema").GeneratorItem | import("@repo/schema").DisplayItem | import("@repo/schema").LogicItem | import("@repo/schema").CircuitItem>, stepName?: string) => void;
        scope: (entity: import("@repo/schema").MaybeArray<import("@repo/schema").Scope>, stepName?: string) => void;
        link: (entity: import("@repo/schema").MaybeArray<import("@repo/schema").ItemLink>, stepName?: string) => void;
    };
};
//# sourceMappingURL=factories.d.ts.map