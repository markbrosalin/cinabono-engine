import { describe, expect, it } from "vitest";
import {
    scene_items_of_custom_buffer,
    scene_items_of_rs_trigger,
} from "../../__tests_/scenes/ready_to_use";
import { DefaultTemplateBuilder } from "../builders";
import { ReadyToUseScene } from "../../__tests_/scenes/types";

const buildAndInspect = (scene: ReadyToUseScene, name: string) => {
    const { deps, scopes, logic, inputs, outputs } = scene;
    const builder = new DefaultTemplateBuilder(deps);

    const template = builder.buildFromSelection({
        inputIds: inputs,
        outputIds: outputs,
        logicIds: logic,
        name,
        scopeId: scopes["root"].id,
    });

    expect(template.hash).toBeTypeOf("string");
    expect(template.kind).toBe("circuit:logic");
    expect(template.name).toBe(name);
    expect(template.inputPins).toBeDefined();
    expect(template.outputPins).toBeDefined();
    expect(template.items).toBeDefined();

    return template;
};

describe("TemplateBuilder", () => {
    it("builds RS-TRIGGER template", () => {
        buildAndInspect(scene_items_of_rs_trigger(), "RS-TRIGGER");
    });

    it("builds CUSTOM-BUFFER template", () => {
        buildAndInspect(scene_items_of_custom_buffer(), "CUSTOM-CUSTOM-BUFFER");
    });
});
