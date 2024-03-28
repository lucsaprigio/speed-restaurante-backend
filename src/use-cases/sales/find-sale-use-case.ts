import { ISalesRepositoryCreate, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class FindSaleUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute(id: string) {
        try {
            const sale = await this.salesRepository.find(id);

            return sale;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}