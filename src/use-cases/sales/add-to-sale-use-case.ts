import { ISalesLaunchRepositoryUpdate, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class AddToSateUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute({ launchs, saleId }: ISalesLaunchRepositoryUpdate) {
        try {
            await this.salesRepository.addToSale({ launchs, saleId });
        } catch (err) {
            Promise.reject(err);
        }
    }
}