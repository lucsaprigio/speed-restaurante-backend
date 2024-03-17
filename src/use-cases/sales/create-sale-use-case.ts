import { ISalesRepositoryCreate, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class CreateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute({ tableId, closed, obs, total }: ISalesRepositoryCreate) {
        try {
            await this.salesRepository.createSale({ tableId, closed, obs, total });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}