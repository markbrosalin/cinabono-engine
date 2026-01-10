import { ComputeServiceContract } from "@gately/domain-model/modules/compute";
import { LibraryServiceContract } from "@gately/domain-model/modules/library";
import { TabServiceContract } from "@gately/domain-model/shared/container-manager/tab";
import { createToken } from "@repo/di/helpers";

export const TabServiceToken = createToken<TabServiceContract>("TabService");
export const ComputeServiceToken = createToken<ComputeServiceContract>("ComputeService");
export const LibraryServiceToken = createToken<LibraryServiceContract>("LibraryService");
