export interface ITab {
    id: string;
    title: string;
}

export type ITabStore = {
    tabs: ITab[];
    activeTab: ITab | undefined;
};
