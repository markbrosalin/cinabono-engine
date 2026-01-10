import { sagaCreateItemConfig } from "./item.config";
import { sagaCreateTabConfig, sagaRemoveTabConfig } from "./tab.config";

export const sagaConfigs = [sagaCreateTabConfig, sagaRemoveTabConfig, sagaCreateItemConfig];
