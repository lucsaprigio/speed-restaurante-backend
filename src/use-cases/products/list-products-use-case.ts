import { IProductsRepository, ProductsRepository } from "../../repositories/products/IProductsRepository";

export class ListProductsUseCase {
    constructor(
        private productsRepository: ProductsRepository
    ) { }

    async execute() {
        try {
            const products = await this.productsRepository.list();

            if (!products) {
                return Promise.reject('Nenhum produto encontrado.')
            }

            return products as IProductsRepository[];
        } catch (err) {
            return Promise.reject(err);
        }
    }
}