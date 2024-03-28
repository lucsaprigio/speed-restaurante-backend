import { executeQuery } from "../../../firebird/firebird";
import { IProductsRepository, ProductsRepository } from "../IProductsRepository";

export class FirebirdProductRepository implements ProductsRepository {
    async find(id: string) {
        try {
            const product = await executeQuery(`SELECT * FROM DB_MOB_PRODUTOS WHERE CD_PRODUTO = ${id}`, []);

            return product[0];
        } catch (err) {
            return Promise.reject(err)
        }
    }

    async list() {
        try {
            const products: IProductsRepository[] = await executeQuery(`
                SELECT CD_PRODUTO, DESCRICAO_PRODUTO, VR_UNITARIO, DB_MOB_PRODUTOS.CD_CATEGORIA, DESCRICAO_CATEGORIA 
                FROM DB_MOB_PRODUTOS
                INNER JOIN DB_MOB_CATEGORIAS ON DB_MOB_PRODUTOS.CD_CATEGORIA = DB_MOB_CATEGORIAS.CD_CATEGORIA
                `, []);

            return products as IProductsRepository[];
        } catch (err) {
            return Promise.reject(err);
        }
    }
}