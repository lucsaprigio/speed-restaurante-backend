export type ISalesRepository = {
    id: string;
    tableId: string;
    obs: string;
    closed: string;
    total: number;
}

export type ISaleLaunch = {
    saleId: string;
    id: string;
    productId: string;
    quantity: number;
    price: number;
    descount: number;
    totalProduct: number;
    obsProduct: number;
}

export type SalesRepository = {
    find: (id: string) => Promise<ISaleLaunch>;
    createSale: (data: ISalesRepository) => Promise<void>;
    createSaleLaunch: (data: ISaleLaunch) => Promise<void>;
    updateSale: (data: ISalesRepository) => Promise<void>;
    updateSaleLaunch: (data: ISaleLaunch) => Promise<void>;
    deleteSale: (id: string) => Promise<void>;
    deleteSaleLaunch: (id: string) => Promise<void>;
}