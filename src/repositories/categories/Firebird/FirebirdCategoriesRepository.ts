import { executeQuery } from "../../../firebird/firebird";
import { CategoriesRepository, ICategoriesRepository } from "../ICategoriesRepository";

/* 
CREATE TABLE DB_MOB_CATEGORIA (
    CD_CATEGORIA         INTEGER NOT NULL,
    DESCRICAO_CATEGORIA  VARCHAR(40)
);

ALTER TABLE DB_MOB_CATEGORIA ADD CONSTRAINT PK_DB_MOB_CATEGORIA PRIMARY KEY (CD_CATEGORIA);
*/

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