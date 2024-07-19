import { ISalesRepository, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class UpdateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute({ obs, tableId, total, userId }: ISalesRepository) {
        try {
            await this.salesRepository.updateSale({ obs, tableId, total, userId });
        } catch (err) {
            return Promise.reject(err)
        }
    }
}