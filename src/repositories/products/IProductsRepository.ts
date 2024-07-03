export type IProductsRepository = {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    category: string;
}

export type IProductsRegistered = {
    CD_PRODUTO: string;
    DESCRICAO_PRODUTO: string;
    CD_SUBGRUPO: string;
    SUBPRODUTOS: string;
    VENDA_PRODUTO: string;
}

export type IProductComplements = {
    ITEN: string;
    CD_PRODUTO: string;
    DESCRICAO_COMPLEMENTO: string;
    ADICIONAL: string;
    QTD_COMPLEMENTO: number;
    VR_UNIT: number;
}

export type ProductsRepository = {
    list: () => Promise<IProductsRepository[]>;
    listProductRegistered: () => Promise<IProductsRegistered[]>;
    find: (id: string) => Promise<IProductsRepository[] | null>;
    listProductComplements: (id: string) => Promise<IProductComplements[] | null>
    listProductAdditional: (id: string) => Promise<IProductComplements[] | null>;
}