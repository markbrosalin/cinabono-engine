import { UCBaseExtended } from "../../use-casess/api-core";
import { UCCreateItem } from "../../use-casess/private";
import { toArray } from "@repo/utils";
export class UCCreateManyItems extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "createItems";
    }
    run(payload) {
        const tasks = toArray(payload);
        const buildRes = tasks.map((p) => new UCCreateItem(this.ctx).run(p));
        if (tasks.length <= 1)
            return buildRes[0];
        return buildRes;
    }
}
