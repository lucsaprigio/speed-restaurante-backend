import { ISaleLaunchCreate, SalesRepository } from "../../repositories/sales/ISalesRepository";

export class CraeteSaleLaunchUseCase {
    constructor(
        private salesRepository: SalesRepository
    ) { }

    async execute(request: ISaleLaunchCreate) {
        try {
            const { launchQuantity, productId, productDescription, quantity, price, descount, saleId, totalProduct, obsProduct } = request;

            for(let i = 0, launchQuantity > i, i++) {
                
            }
            await this.salesRepository.createSaleLaunch({ launchQuantity, productId, productDescription, quantity, price, descount, saleId, totalProduct, obsProduct });
        } catch (error) {

        }
    }
}