import { ISalesRepository, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class UpdateSaleUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute({ obs, total, userId, id }: ISalesRepository) {
        try {
            await this.salesRepository.updateSale({ obs, total, userId, id });
        } catch (err) {
            return Promise.reject(err)
        }
    }
}