export type ISalesRepository = {
    id: string;
    tableId: string;
    obs: string;
    closed: string;
    total: number;
}

export type ISalesRepositoryCreate = {
    tableId: string;
    obs: string;
    closed: string;
    total: number;
    launchs: ISaleLaunchCreate[]
}

//@ts-ignore
export type ISaleLaunchCreate = Array<T> & {
    launchQuantity: number,
    saleId: string;
    productId: string;
    productDescription: string,
    quantity: number;
    price: number;
    descount: number;
    totalProduct: number;
    obsProduct: number;
}

export type ISaleLaunch = {
    launchQuantity: number,
    saleId: string;
    id: string;
    productId: string;
    productDescription: string,
    quantity: number;
    price: number;
    descount: number;
    totalProduct: number;
    obsProduct: number;
}

export type SalesRepository = {
    find: (id: string) => Promise<ISaleLaunch | any>;
    createSale: (data: ISalesRepositoryCreate) => Promise<void>;
    createSaleLaunch: (data: ISaleLaunchCreate) => Promise<void>;
    updateSale: ({ tableId, closed, obs, total }: ISalesRepository) => Promise<void>;
    updateSaleLaunch: ({ id, quantity, totalProduct, obsProduct, descount }: ISaleLaunch) => Promise<void>;
    deleteSale: (id: string) => Promise<void>;
    deleteSaleLaunch: (id: string) => Promise<void>;
}