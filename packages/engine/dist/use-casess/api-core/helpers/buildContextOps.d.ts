import { EngineCtxStores } from "../../../enginee";
import { FlowToolContract } from "@engine/use-casess/tools";
export declare const buildContextOps: (flow: FlowToolContract, stores: EngineCtxStores) => {
    readonly globalOps: {
        getTab: {
            (key: string, safely: false, stepName?: string): import("../../..").TabContract | undefined;
            (key: string, safely?: true, stepName?: string): import("../../..").TabContract;
        };
        getTemplate: {
            (key: string, safely: false, stepName?: string): import("@repo/schema").GeneratorTemplate | import("@repo/schema").DisplayTemplate | import("@repo/schema").LogicTemplate | import("@repo/schema").CircuitTemplate | undefined;
            (key: string, safely?: true, stepName?: string): import("@repo/schema").GeneratorTemplate | import("@repo/schema").DisplayTemplate | import("@repo/schema").LogicTemplate | import("@repo/schema").CircuitTemplate;
        };
        removeTab: {
            (keys: string[], stepName?: string): import("../../..").TabContract[];
            (key: string, stepName?: string): import("../../..").TabContract | undefined;
        };
        removeTemplate: {
            (keys: string[], stepName?: string): (import("@repo/schema").GeneratorTemplate | import("@repo/schema").DisplayTemplate | import("@repo/schema").LogicTemplate | import("@repo/schema").CircuitTemplate)[];
            (key: string, stepName?: string): import("@repo/schema").GeneratorTemplate | import("@repo/schema").DisplayTemplate | import("@repo/schema").LogicTemplate | import("@repo/schema").CircuitTemplate | undefined;
        };
        saveTab: (entity: import("@repo/schema").MaybeArray<import("../../..").TabContract>, stepName?: string) => void;
        saveTemplate: (entity: import("@repo/schema").MaybeArray<import("@repo/schema").GeneratorTemplate | import("@repo/schema").DisplayTemplate | import("@repo/schema").LogicTemplate | import("@repo/schema").CircuitTemplate>, stepName?: string) => void;
    };
    readonly tabOps: (tab: import("../../..").TabContract) => {
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
    readonly scopeOps: any;
};
//# sourceMappingURL=buildContextOps.d.ts.map