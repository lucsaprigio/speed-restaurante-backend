import { executeQuery } from "../../../firebird/firebird";
import { CategoriesRepository, ICategoriesRepository } from "../ICategoriesRepository";

export class FirebirdCategoriesRepository implements CategoriesRepository {
    async list() {
        try {
            const categories = await executeQuery(`SELECT * FROM DB_MOB_CATEGORIAS`, []);

            return categories as ICategoriesRepository[]
        } catch (err) {
            return Promise.reject(err);
        }
    }
}