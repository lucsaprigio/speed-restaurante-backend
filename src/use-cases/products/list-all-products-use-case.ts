import { ProductsRepository } from "../../repositories/products/IProductsRepository";

export class ListAllProductsUseCase {
    constructor(
        private productsRepository: ProductsRepository
    ) { }

    async execute() {
        try {
            const products = this.productsRepository.listProductRegistered();

            return products
        } catch (err) {
            return Promise.reject(err);
        }
    }
}