import { executeQuery } from "../../../firebird/firebird";
import { IProductComplements, IProductsRepository, ProductsRepository } from "../IProductsRepository";

/* 
CREATE TABLE DB_MOB_PEDIDO_CABE (
    CD_PEDIDO INTEGER NOT NULL,
    CD_MESA INTEGER,
    OBS VARCHAR(50),
    TOTAL NUMERIC(15,2),
    FECHADO INTEGER);

ALTER TABLE DB_MOB_PEDIDO_CABE
ADD CONSTRAINT PK_DB_MOB_PEDIDO_CABE
PRIMARY KEY (CD_PEDIDO);

CREATE SEQUENCE DB_MOB_PEDIDO_CABE;
*/

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
                FROM DB_MOB_REST_PROD
                INNER JOIN DB_MOB_CATEGORIAS ON DB_MOB_PRODUTOS.CD_CATEGORIA = DB_MOB_CATEGORIAS.CD_CATEGORIA
                `, []);

            return products as IProductsRepository[];
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async listProductComplements(id: string) {
        try {

        } catch (err) {
            return Promise.reject(err);

        }
    }
}