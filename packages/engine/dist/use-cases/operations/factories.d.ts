import { TabContract } from "../../tab-factory/index.js";
import { ApiCtx } from "../../api/types/index.js";
import { FlowToolContract } from "../../use-cases/index.js";
export declare const openGlobalOperations: (flow: FlowToolContract, stores: ApiCtx["deps"]["stores"]) => {
    getTab: {
        (key: string, safely: false, stepName?: string): TabContract | undefined;
        (key: string, safely?: true, stepName?: string): TabContract;
    };
    getTemplate: {
        (key: string, safely: false, stepName?: string): import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate | undefined;
        (key: string, safely?: true, stepName?: string): import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate;
    };
    removeTab: {
        (keys: string[], stepName?: string): TabContract[];
        (key: string, stepName?: string): TabContract | undefined;
    };
    removeTemplate: {
        (keys: string[], stepName?: string): (import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate)[];
        (key: string, stepName?: string): import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate | undefined;
    };
    saveTab: (entity: import("@cnbn/schema").MaybeArray<TabContract>, stepName?: string) => void;
    saveTemplate: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate>, stepName?: string) => void;
};
export declare const openTabOperations: (flow: FlowToolContract) => (tab: TabContract) => {
    get: {
        item: {
            (key: string, safely: false, stepName?: string): import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem | undefined;
            (key: string, safely?: true, stepName?: string): import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem;
        };
        scope: {
            (key: string, safely: false, stepName?: string): import("@cnbn/schema").Scope | undefined;
            (key: string, safely?: true, stepName?: string): import("@cnbn/schema").Scope;
        };
        link: {
            (key: string, safely: false, stepName?: string): import("@cnbn/schema").ItemLink | undefined;
            (key: string, safely?: true, stepName?: string): import("@cnbn/schema").ItemLink;
        };
    };
    remove: {
        item: {
            (keys: string[], stepName?: string): (import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem)[];
            (key: string, stepName?: string): import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem | undefined;
        };
        scope: {
            (keys: string[], stepName?: string): import("@cnbn/schema").Scope[];
            (key: string, stepName?: string): import("@cnbn/schema").Scope | undefined;
        };
        link: {
            (keys: string[], stepName?: string): import("@cnbn/schema").ItemLink[];
            (key: string, stepName?: string): import("@cnbn/schema").ItemLink | undefined;
        };
    };
    save: {
        item: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem>, stepName?: string) => void;
        scope: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").Scope>, stepName?: string) => void;
        link: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").ItemLink>, stepName?: string) => void;
    };
};
export declare const openScopeOperations: (flow: FlowToolContract) => {
    reg: {
        itemToScope: (item: import("@cnbn/schema").WithId & import("@cnbn/schema").WithItemKind & import("@cnbn/schema").ScopeChildItem, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
        scopeToScope: (childId: import("@cnbn/schema").Id, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
        linkToScope: (link: import("@cnbn/schema").ItemLink, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
    };
    unreg: {
        itemFromScope: (item: import("@cnbn/schema").WithId & import("@cnbn/schema").WithItemKind & import("@cnbn/schema").ScopeChildItem, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
        scopeFromScope: (childId: import("@cnbn/schema").Id, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
        linkFromScope: (link: import("@cnbn/schema").ItemLink, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
    };
};
export declare const ApiOpsFactory: (flow: FlowToolContract, stores: ApiCtx["deps"]["stores"]) => {
    readonly global: {
        getTab: {
            (key: string, safely: false, stepName?: string): TabContract | undefined;
            (key: string, safely?: true, stepName?: string): TabContract;
        };
        getTemplate: {
            (key: string, safely: false, stepName?: string): import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate | undefined;
            (key: string, safely?: true, stepName?: string): import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate;
        };
        removeTab: {
            (keys: string[], stepName?: string): TabContract[];
            (key: string, stepName?: string): TabContract | undefined;
        };
        removeTemplate: {
            (keys: string[], stepName?: string): (import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate)[];
            (key: string, stepName?: string): import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate | undefined;
        };
        saveTab: (entity: import("@cnbn/schema").MaybeArray<TabContract>, stepName?: string) => void;
        saveTemplate: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").GeneratorTemplate | import("@cnbn/schema").DisplayTemplate | import("@cnbn/schema").LogicTemplate | import("@cnbn/schema").CircuitTemplate>, stepName?: string) => void;
    };
    readonly tab: (tab: TabContract) => {
        get: {
            item: {
                (key: string, safely: false, stepName?: string): import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem | undefined;
                (key: string, safely?: true, stepName?: string): import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem;
            };
            scope: {
                (key: string, safely: false, stepName?: string): import("@cnbn/schema").Scope | undefined;
                (key: string, safely?: true, stepName?: string): import("@cnbn/schema").Scope;
            };
            link: {
                (key: string, safely: false, stepName?: string): import("@cnbn/schema").ItemLink | undefined;
                (key: string, safely?: true, stepName?: string): import("@cnbn/schema").ItemLink;
            };
        };
        remove: {
            item: {
                (keys: string[], stepName?: string): (import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem)[];
                (key: string, stepName?: string): import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem | undefined;
            };
            scope: {
                (keys: string[], stepName?: string): import("@cnbn/schema").Scope[];
                (key: string, stepName?: string): import("@cnbn/schema").Scope | undefined;
            };
            link: {
                (keys: string[], stepName?: string): import("@cnbn/schema").ItemLink[];
                (key: string, stepName?: string): import("@cnbn/schema").ItemLink | undefined;
            };
        };
        save: {
            item: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").GeneratorItem | import("@cnbn/schema").DisplayItem | import("@cnbn/schema").LogicItem | import("@cnbn/schema").CircuitItem>, stepName?: string) => void;
            scope: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").Scope>, stepName?: string) => void;
            link: (entity: import("@cnbn/schema").MaybeArray<import("@cnbn/schema").ItemLink>, stepName?: string) => void;
        };
    };
    readonly scope: {
        reg: {
            itemToScope: (item: import("@cnbn/schema").WithId & import("@cnbn/schema").WithItemKind & import("@cnbn/schema").ScopeChildItem, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
            scopeToScope: (childId: import("@cnbn/schema").Id, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
            linkToScope: (link: import("@cnbn/schema").ItemLink, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
        };
        unreg: {
            itemFromScope: (item: import("@cnbn/schema").WithId & import("@cnbn/schema").WithItemKind & import("@cnbn/schema").ScopeChildItem, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
            scopeFromScope: (childId: import("@cnbn/schema").Id, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
            linkFromScope: (link: import("@cnbn/schema").ItemLink, scope: import("@cnbn/schema").Scope, stepName?: string) => void;
        };
    };
};
//# sourceMappingURL=factories.d.ts.map