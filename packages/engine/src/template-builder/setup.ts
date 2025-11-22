import { DefaultTemplateBuilder, TemplateBuilderContract } from "./builders";
import {
	TemplateBuilderArgs,
	TemplateBuilderDeps,
	TemplateBuilderResult,
} from "./types";

export interface TemplateBuilderFactoryOverride {
	makeTempBuilder?: (deps: TemplateBuilderDeps) => TemplateBuilderContract;
}

export type TemplateBuilderFactory = (
	deps: TemplateBuilderDeps,
	args: TemplateBuilderArgs
) => TemplateBuilderResult;

export class TemplateBuilderSetup {
	static init(
		override: TemplateBuilderFactoryOverride = {}
	): TemplateBuilderFactory {
		return (deps, args) => {
			const builder =
				override.makeTempBuilder?.(deps) ??
				new DefaultTemplateBuilder(deps);
			return builder.buildFromSelection(args);
		};
	}
}
