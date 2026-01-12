export interface ITab {
    id: string;
    title: string;
}

export type TabStoreState = {
    tabs: ITab[];
    activeTab: ITab | undefined;
};

export type TabId = ITab["id"];
