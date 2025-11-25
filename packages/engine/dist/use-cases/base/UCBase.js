/* eslint-disable @typescript-eslint/no-explicit-any */
export class UCBase {
    constructor(ctx, name = "unknown_usecase") {
        this.ctx = ctx;
        this.name = name;
        this.flow = ctx.useCaseInfra.makeFlowTool(name, ctx.bus);
        this.executor = ctx.useCaseInfra.makeExecutorTool(this.flow, ctx.bus);
    }
}
