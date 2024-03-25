import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { ISaleLaunch, ISaleLaunchCreate, ISalesLaunchRepositoryUpdate, ISalesRepository, ISalesRepositoryCreate, SalesRepository } from "../ISalesRepository";

export class FirebirdSalesRepository implements SalesRepository {
    async find(id: string) {
        try {
            console.log(`
            SELECT DB_MOB_PEDIDO_CABE.CD_PEDIDO, DB_MOB_PEDIDO_CABE.CD_MESA, OBS, 
            FECHADO, TOTAL, CD_PRODUTO, 
            DESCRICAO_PRODUTO, DESCONTO_PRODUTO,
            OBS_PRODUTO,
            QTD_PRODUTO,
            UNIT_PRODUTO,
            TOTAL_PRODUTO
            FROM DB_MOB_PEDIDO_CABE
            INNER JOIN DB_MOB_PEDIDO_LANCA ON DB_MOB_PEDIDO_CABE.CD_PEDIDO = DB_MOB_PEDIDO_LANCA.CD_PEDIDO 
            WHERE DB_MOB_PEDIDO_CABE.CD_PEDIDO = ${id}`)

            const sale = await executeQuery(`
            SELECT DB_MOB_PEDIDO_CABE.CD_PEDIDO, DB_MOB_PEDIDO_CABE.CD_MESA, OBS, 
            FECHADO, TOTAL, CD_PRODUTO, 
            DESCRICAO_PRODUTO, DESCONTO_PRODUTO,
            OBS_PRODUTO,
            QTD_PRODUTO,
            UNIT_PRODUTO,
            TOTAL_PRODUTO
            FROM DB_MOB_PEDIDO_CABE
            INNER JOIN DB_MOB_PEDIDO_LANCA ON DB_MOB_PEDIDO_CABE.CD_PEDIDO = DB_MOB_PEDIDO_LANCA.CD_PEDIDO 
            WHERE DB_MOB_PEDIDO_CABE.CD_PEDIDO = ${id}          
            `, []);

            return sale;
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    async createSale({ closed, obs, tableId, total, launchs }: ISalesRepositoryCreate) {
        try {
            var sale: { CD_PEDIDO: number } = await executeTransaction(`
                INSERT INTO DB_MOB_PEDIDO_CABE (CD_PEDIDO, CD_MESA, OBS, TOTAL, FECHADO)
                VALUES (gen_id(db_mob_pedido_cabe, 1), ${tableId}, '${obs}', ${total}, '${closed}')
                RETURNING CD_PEDIDO
            `, []);


            for (let i = 0; i < launchs.length; i++) {
                console.log(`
                INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
                total_produto, obs_produto, cd_pedido)
                VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${launchs[i].productId}, '${launchs[i].productDescription}', ${launchs[i].price}, ${launchs[i].descount}, ${launchs[i].quantity}, ${launchs[i].totalProduct}, '${launchs[i].obsProduct}', ${sale.CD_PEDIDO}
                )`)

                await executeTransaction(`
                INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
                    total_produto, obs_produto, cd_pedido)
                    VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${launchs[i].productId}, '${launchs[i].productDescription}', ${launchs[i].price}, ${launchs[i].descount}, ${launchs[i].quantity}, ${launchs[i].totalProduct}, '${launchs[i].obsProduct}', ${sale.CD_PEDIDO}
                    )`, []);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async addToSale({ launchs, saleId }: ISalesLaunchRepositoryUpdate) {
        try {
            for (let i = 0; i < launchs.length; i++) {
                await executeTransaction(`
                INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
                    total_produto, obs_produto, cd_pedido)
                    VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${launchs[i].productId}, '${launchs[i].productDescription}', ${launchs[i].price}, ${launchs[i].descount}, ${launchs[i].quantity}, ${launchs[i].totalProduct}, '${launchs[i].obsProduct}', ${saleId}
                    )`, []);
            }
        } catch (err) {
            Promise.reject(err);
            console.log(err);
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