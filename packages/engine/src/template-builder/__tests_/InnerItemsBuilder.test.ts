import { describe, expect, it } from "vitest";
import {
    scene_items_of_custom_buffer,
    scene_items_of_rs_trigger,
} from "../../__tests_/scenes/ready_to_use";
import { InnerItemsBuilder } from "../builders/InnerItemsBuilder";
import { InnerItemsMap } from "@cnbn/schema";

describe("InnerItemsBuilder", () => {
    it("builds two nors as inner items of RS-trigger without links to toggles/lamps", () => {
        const { deps, items, scopes, logic } = scene_items_of_rs_trigger();

        const iib = new InnerItemsBuilder(deps);

        const MetaOfNor1 = items.nor1.meta;
        const MetaOfNor2 = items.nor2.meta;
        const OptsOfNor1 = items.nor1.options;
        const OptsOfNor2 = items.nor2.options;

        const res: InnerItemsMap = {};
        for (const id of logic) {
            res[id] = iib.buildInnerItem(id, scopes["root"]);
        }

        expect(Object.keys(res).length).toBe(2);

        expect(res[items.nor1.id].meta).toEqual(MetaOfNor1);
        expect(res[items.nor2.id].meta).toEqual(MetaOfNor2);
        expect(res[items.nor1.id].options).toEqual(OptsOfNor1);
        expect(res[items.nor2.id].options).toEqual(OptsOfNor2);
        expect(res[items.nor1.id]);

        expect(res[items.nor1.id]).to.deep.include({
            inputLinks: { "1": "nor2:0:nor1:1" },
            outputLinks: { "0": ["nor1:0:nor2:0"] },
        });

        expect(res[items.nor2.id]).to.deep.include({
            inputLinks: { "0": "nor1:0:nor2:0" },
            outputLinks: { "0": ["nor2:0:nor1:1"] },
        });
    });

    it("builds custom-buffer as inner item without links to toggles/lamps", () => {
        const { deps, items, scopes, logic } = scene_items_of_custom_buffer();

        const iib = new InnerItemsBuilder(deps);

        const res: InnerItemsMap = {};
        for (const id of logic) {
            res[id] = iib.buildInnerItem(id, scopes["root"]);
        }

        expect(Object.keys(res).length).toBe(1);
        expect(res[items["custom_buffer1"].id]).to.not.have.property("inputLinks");
        expect(res[items["custom_buffer1"].id]).to.not.have.property("outputLinks");
    });
});
