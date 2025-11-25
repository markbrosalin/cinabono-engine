import { getScopeIdFromPath, getTabIdFromPath, parseLinkId } from "@repo/helpers";
import { UCBaseExtended } from "../../use-cases/use-case/UCBaseExtended";
export class UCCreateItem extends UCBaseExtended {
    run(payload) {
        const tab = this.ctx.globalOps.getTab(getTabIdFromPath(payload.path));
        const res = this._buildItemStep(payload);
        const parentScope = this.ctx.tabOps(tab).get.scope(getScopeIdFromPath(payload.path));
        this.ctx.scopeOps.reg.itemToScope(res.buildItem, parentScope);
        this._saveInStoresStep(tab, res);
        const { scopes: _, ...excludeScopes } = res;
        return excludeScopes;
    }
    _buildItemStep(payload) {
        const template = this.ctx.globalOps.getTemplate(payload.hash);
        const args = Object.assign(template, payload);
        const res = this.flow.addStep("BuildItem", () => this.ctx.itemBuilder(args));
        return res;
    }
    _saveInStoresStep(tab, data) {
        return this.flow.addStep("SaveBuildResultInStores", () => {
            const { save } = this.ctx.tabOps(tab);
            const { items, scopes, linkIds } = data;
            const links = linkIds.map(parseLinkId);
            save.item(items);
            save.scope(scopes);
            save.link(links);
        });
    }
}
