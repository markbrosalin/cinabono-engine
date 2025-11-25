import { UCBaseExtended } from "../../use-casess/api-core";
import { UCUnlinkItem } from "../private";
export class UCUnlinkManyItems extends UCBaseExtended {
    constructor() {
        super(...arguments);
        this.name = "unlinkItems";
    }
    run(payload) {
        const { tabId } = payload;
        const tasks = "linkIds" in payload ? payload.linkIds : [payload.linkId];
        const { removedLinks, inputEvents } = this._unlinkBatch(tasks, tabId);
        if (removedLinks.length <= 1)
            return { removedLink: removedLinks[0], tabId, inputEvents };
        return { removedLinks, tabId, inputEvents };
    }
    _unlinkBatch(tasks, tabId) {
        return tasks.reduce((acc, linkId) => {
            const res = new UCUnlinkItem(this.ctx).run({ tabId, linkId });
            if (res.removedLink)
                acc.removedLinks.push(res.removedLink);
            acc.inputEvents.push(...res.inputEvents);
            return acc;
        }, { inputEvents: [], removedLinks: [] });
    }
}
