import { AppStorage } from "../../storage";

export const getTheme = () => AppStorage.PREFERENCES.theme[0]();

export const getLanguage = () => AppStorage.PREFERENCES.lang[0]();
