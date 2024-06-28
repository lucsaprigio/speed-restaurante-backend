import { executeQuery } from "../../../firebird/firebird";
import { IProductComplements, IProductsRegistered, IProductsRepository, ProductsRepository } from "../IProductsRepository";



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
                INNER JOIN DB_MOB_CATEGORIA ON DB_MOB_PRODUTOS.CD_CATEGORIA = DB_MOB_CATEGORIA.CD_CATEGORIA
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

    async listProductRegistered() {
        try {
            const products: IProductsRegistered[] = await executeQuery(`
        SELECT
            DB_PRODUTOS_CADASTROS_SUB.subprodutos,
            DB_PRODUTOS_CADASTROS.DESCRICAO_PRODUTO,
            COALESCE(DB_PRODUTOS_CUSTOS.venda_produto, 0) AS VENDA_PRODUTO,
            COALESCE(DB_PRODUTOS_CADASTROS.cd_subgrupos, 0) AS CD_SUBGRUPOS,
            DB_SUBGRUPOS.descricao_subgrupo
        FROM DB_PRODUTOS_CADASTROS_SUB
        INNER JOIN db_produtos_cadastros ON DB_PRODUTOS_CADASTROS_SUB.subprodutos = DB_PRODUTOS_CADASTROS.cd_produto
        INNER JOIN DB_PRODUTOS_CUSTOS ON DB_PRODUTOS_CADASTROS_SUB.subprodutos = DB_PRODUTOS_CUSTOS.cd_produto
        LEFT JOIN db_subgrupos ON db_produtos_cadastros.cd_subgrupos = db_subgrupos.cd_subgrupos
        WHERE DB_PRODUTOS_CADASTROS.CD_PRODUTO  > 0 AND VENDA_PRODUTO > 0
    `, []);

            return products as IProductsRegistered[];
        } catch (err) {
            return Promise.reject(err);
        }
    }
}