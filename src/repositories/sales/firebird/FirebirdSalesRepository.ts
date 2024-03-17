import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { ISaleLaunch, ISalesRepository, ISalesRepositoryCreate, SalesRepository } from "../ISalesRepository";

export class FirebirdSalesRepository implements SalesRepository {
    async find(id: string) {
        try {
            const sale = await executeQuery(`
            SELECT CD_PEDIDO, CD_MESA, OBS, 
            FECHADO, TOTAL, CD_PRODUTO, 
            DESCRICAO_PRODUTO, DESCONTO_PRODUTO,
            OBS_PRODUTO,
            QTD_PRODUTO,
            UNIT_PRODUTO,
            TOTAL_PRODUTO,
            FROM DB_MOB_PEDIDO,
            INNER JOIN DB_MOB_PEDIDO_LANCA ON DB_MOB_PEDIDO_CABE.CD_PEDIDO = DB_MOB_PEDIDO_LANCA.CD_PEDIDO 
            WHERE CD_PEDIDO = ${id}          
            `, []);

            return sale;
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    async createSale({ closed, obs, tableId, total }): Promise<void> {
        try {
            await executeTransaction(`
                INSERT INTO DB_MOB_PEDIDO_CABE (CD_PEDIDO, CD_MESA, OBS, TOTAL, FECHADO)
                VALUES (gen_id(db_mob_pedido_cabe, 1), ${tableId}, ${obs}, ${total}, ${closed})
            `, []);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async createSaleLaunch({ descount, productDescription, obsProduct, price, productId, quantity, saleId, totalProduct }) {
        try {
            await executeTransaction(`
            INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
            total_produto, obs_produto, cd_pedido)
            VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${productId}, ${productDescription}, ${price}, ${descount}, ${quantity}, ${totalProduct}, ${obsProduct}, ${saleId}
            )`, []);
        } catch (error) {
            return Promise.reject(error)
        }

    }

    async updateSale({ closed, obs, tableId, total }: ISalesRepository) {
        try {
            await executeTransaction(`UPDATE db_mob_pedido_cabe
            set cd_mesa = ${tableId}
                obs = ${obs}
                fechado = ${closed}
                total = ${total}
                `, [])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    async updateSaleLaunch({ id, quantity, totalProduct, obsProduct, descount }) {
        try {
            await executeTransaction(`
                UPDATE DB_MOB_PEDIDO_LANCA SET
                QTD_PRODUTO = ${quantity},
                TOTAL_PRODUTO = ${totalProduct},
                OBS_PRODUTO = ${obsProduct},
                DESCONTO_PRODUTO = ${descount}
                WHERE ITEN = ${id}
            `, [])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    async deleteSale(id: string) {
        try {
            await executeTransaction(`DELETE FROM DB_MOB_PEDIDO_CABE WHERE CD_PEDIDO = ${id}`, [])
        } catch (err) {
            return Promise.reject(err)
        }
    }

    async deleteSaleLaunch(id: string) {
        try {
            await executeTransaction(`DELETE FROM DB_MOB_PEDIDO_LANCA WHERE CD_PEDIDO = ${id}`, []);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}