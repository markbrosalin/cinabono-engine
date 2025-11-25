export declare abstract class ToolsService<TTools> {
    protected _tools: TTools | undefined;
    constructor({ tools }: {
        tools: TTools;
    });
    get tools(): TTools;
    kill(): void;
}
//# sourceMappingURL=toolsOnly.service.d.ts.map