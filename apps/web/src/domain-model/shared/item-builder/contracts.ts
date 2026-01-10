import { BuildArgs, ItemBuilderProps, ItemBuildResult } from "./types";

export type ItemBuilderFactory = (args: ItemBuilderProps) => ItemBuilderContract;

export interface ItemBuilderContract {
    build(args: BuildArgs): Promise<ItemBuildResult>;
}
