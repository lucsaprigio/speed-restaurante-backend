import { CategoriesRepository } from "../../repositories/categories/ICategoriesRepository";

export class ListCategoriesUseCase {
    constructor(
        private categoriesRepository: CategoriesRepository
    ) { }


    async execute() {
        try {
            const categories = await this.categoriesRepository.list();

            return categories;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}