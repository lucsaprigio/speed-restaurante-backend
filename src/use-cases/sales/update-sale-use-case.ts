import { ISalesRepository, ISalesRepositoryCreate, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class UpdateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute({ closed, obs, tableId, total }: ISalesRepository) {
        try {
            await this.salesRepository.updateSale({ closed, obs, tableId, total });
        } catch (err) {
            return Promise.reject(err)
        }
    }
}