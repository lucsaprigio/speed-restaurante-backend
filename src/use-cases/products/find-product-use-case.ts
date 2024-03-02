import { ProductsRepository } from "../../repositories/products/IProductsRepository";

export class FindProductUseCase {
    constructor(
        private productRepository: ProductsRepository
    ) { }

    async execute(id: string) {
        try {
            const product = this.productRepository.find(id);

            if (!product) {
                return Promise.resolve('Não encontrado')
            }

            return product;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}