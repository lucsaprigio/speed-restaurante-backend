import { ISalesRepositoryCreate, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class CreateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute({ tableId, closed, obs, total, launchs }: ISalesRepositoryCreate) {
        try {
            await this.salesRepository.createSale({ tableId, closed, obs, total, launchs });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}