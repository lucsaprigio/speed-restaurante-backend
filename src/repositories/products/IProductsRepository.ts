export type IProductsRepository = {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    category: string;
}

export type ProductsRepository = {
    list: () => Promise<IProductsRepository[]>;
    find: (id: string) => Promise<IProductsRepository[] | null>;
}