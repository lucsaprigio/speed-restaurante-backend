export type ICategoriesRepository = {
    CD_CATEGORIA: string;
    DESCRICAO_CATEGORIA: string;
}

export type CategoriesRepository = {
    list: () => Promise<ICategoriesRepository[] | null>;
}