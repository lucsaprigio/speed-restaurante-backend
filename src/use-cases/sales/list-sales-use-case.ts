import { SalesRepository } from "../../repositories/sales/ISalesRepository";

export class ListSalesUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute(userId: string) {
        try {
            const sales = await this.salesRepository.listSales(userId);

            return sales;
        } catch (err) {
            Promise.reject(err);
        }
    }
}