import { SalesRepository } from "../../repositories/sales/ISalesRepository";

export class FindSaleLaunchUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute(productId: string, saleId: string) {
        try {
            const saleLaunch = await this.salesRepository.findSaleLaunch(productId, saleId);

            return saleLaunch;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}