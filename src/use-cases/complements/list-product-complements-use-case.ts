import { ProductsRepository } from "../../repositories/products/IProductsRepository";

export class ListProductComplementsUseCase {
    constructor(
        private productRepository: ProductsRepository
    ) { }

    async execute(id: string) {
        try {
            const complements = await this.productRepository.listProductComplements(id);

            return complements;
        } catch (err) {
            return Promise.reject(err)
        }
    }
}