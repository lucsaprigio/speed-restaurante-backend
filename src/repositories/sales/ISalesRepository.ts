export type ISalesRepository = {
    id?: string;
    tableId?: string;
    obs: string;
    closed?: string;
    total: number;
    userId: string;
    created_at: string;
}

export type ISalesRepositoryCreate = {
    tableId: string;
    userId: string;
    obs: string;
    closed: string;
    total: number;
    launchs: ISaleLaunchCreate[]
}

export type ISalesLaunchRepositoryUpdate = {
    launchs: ISaleLaunchCreate[]
    saleId: string;
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
    obsProduct: string;
    additional: string;
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
    obsProduct: string;
    additionalProduct: string;
}

export type ISaleId = {
    saleId: string;
}

export type SalesRepository = {
    find: (id: string) => Promise<ISaleLaunch | any>;
    findSaleLaunch: (productId: string, saleId: string) => Promise<ISaleLaunch>;
    listSales: (userId: string) => Promise<ISalesRepository>;
    createSale: (data: ISalesRepositoryCreate) => Promise<void>;
    updateSale: ({ tableId, obs, total }: ISalesRepository) => Promise<void>;
    updateSaleLaunch: ({ id, quantity, totalProduct, obsProduct, descount }: ISaleLaunch) => Promise<void>;
    addToSale: (data: ISalesLaunchRepositoryUpdate) => Promise<void>;
    deleteSale: (id: string) => Promise<void>;
    deleteSaleLaunch: (id: string) => Promise<void>;
}