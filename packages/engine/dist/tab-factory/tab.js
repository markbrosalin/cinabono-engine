export class DefaultTab {
    ctx;
    id;
    constructor(ctx, id) {
        this.ctx = ctx;
        this.id = id;
    }
    close() {
        this.ctx.itemStore.clear();
        this.ctx.linkStore.clear();
        this.ctx.scopeStore.clear();
        this.ctx.simulation.kill();
    }
}
