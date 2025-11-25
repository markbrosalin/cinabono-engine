export declare class WorkerClient {
    protected readonly worker: Worker;
    private _id;
    private _pending;
    constructor(worker: Worker);
    get callApi(): {
        "/item/create": <P extends import("@cnbn/schema").MaybeArray<import("@cnbn/engine").ApiCreateSingleItem_Data<import("@cnbn/schema").KindKey>["payload"]>>(payload: P) => Promise<import("@cnbn/engine").ResultOfMaybeArray<P, import("@cnbn/engine").ItemBuilderResult<import("@cnbn/engine").KindFromPayload<P>>>>;
        "/item/link": <P extends import("@cnbn/schema").MaybeArray<import("@cnbn/engine").ApiLinkSingleItem_Payload>>(payload: P) => Promise<import("@cnbn/engine").ResultOfMaybeArray<P, import("@cnbn/engine").ApiLinkSingleItem_Result>>;
        "/item/remove": <P extends import("@cnbn/schema").MaybeArray<import("@cnbn/engine").ApiRemoveSingleItem_Payload>>(payload: P) => Promise<import("@cnbn/engine").ResultOfMaybeArray<P, import("@cnbn/engine").ApiRemoveSingleItem_Result>>;
        "/item/unlink": <P extends import("@cnbn/schema").MaybeArray<import("@cnbn/engine").ApiUnlinkSingleItem_Payload>>(payload: P) => Promise<import("@cnbn/engine").ResultOfMaybeArray<P, import("@cnbn/engine").ApiUnlinkSingleItem_Result>>;
        "/tab/create": (payload: Partial<Pick<Pick<import("@cnbn/schema").TabScope, "kind"> & Partial<import("@cnbn/schema").TabScope>, "id" | "storedItems" | "storedScopes">> | undefined) => Promise<{
            tabId: import("@cnbn/schema").Id;
        }>;
        "/tab/remove": (payload: {
            tabId: import("@cnbn/schema").Id;
        }) => Promise<{
            isTabRemoved: boolean;
        }>;
    };
    private _rpcify;
    private _getNextId;
}
//# sourceMappingURL=worker-client.d.ts.map