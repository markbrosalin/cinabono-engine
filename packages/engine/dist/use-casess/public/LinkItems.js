import { UCLinkItem } from "../private";
import { UCBaseExtended } from "../api-core";
export class UCLinkManyItems extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "linkItems";
    }
    run(payload) {
        const { tabId } = payload;
        const tasks = "links" in payload ? payload.links : [payload.link];
        // saving links
        const { linkIds, inputEvents } = this._saveBatch(tasks, tabId);
        if (linkIds.length <= 1)
            return { linkId: linkIds[0], tabId, inputEvents };
        return { linkIds, tabId, inputEvents };
    }
    _saveBatch(tasks, tabId) {
        return tasks.reduce((acc, link) => {
            const res = new UCLinkItem(this.ctx).run({ tabId, link });
            acc.linkIds.push(res.linkId);
            acc.inputEvents.push(...res.inputEvents);
            return acc;
        }, { inputEvents: [], linkIds: [] });
    }
}
