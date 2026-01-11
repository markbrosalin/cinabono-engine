export interface ITab {
    id: string;
    title: string;
}

export type TabBarState = {
    tabs: ITab[];
};

export type TabId = ITab["id"];
