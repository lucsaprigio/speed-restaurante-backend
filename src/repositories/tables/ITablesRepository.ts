export type ITablesRepository = {
    id: string;
    description: string;
    busy: string;
}

export type TablesRepository = {
    list: () => Promise<ITablesRepository[] | any>;
    find: (id: string) => Promise<ITablesRepository[]>;
    setBusy: (id: string) => Promise<void>;
}