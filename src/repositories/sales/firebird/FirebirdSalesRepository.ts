import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { ISaleLaunch, ISalesLaunchRepositoryUpdate, ISalesRepository, ISalesRepositoryCreate, SalesRepository } from "../ISalesRepository";

export class FirebirdSalesRepository implements SalesRepository {
    async find(id: string) {
        try {
            const sale = await executeQuery(`
            SELECT DB_MOB_PEDIDO_CABE.CD_PEDIDO, DB_MOB_PEDIDO_CABE.CD_MESA, OBS, 
            FECHADO, TOTAL, CD_PRODUTO, 
            DESCRICAO_PRODUTO, DESCONTO_PRODUTO,
            OBS_PRODUTO,
            QTD_PRODUTO,
            DB_MOB_PEDIDO_LANCA.STATUS_LANCA,
            ADICIONAL_PRODUTO,
            UNIT_PRODUTO,
            TOTAL_PRODUTO,
            DB_MOB_PEDIDO_CABE.DTA_TRANS
            FROM DB_MOB_PEDIDO_CABE
            INNER JOIN DB_MOB_PEDIDO_LANCA ON DB_MOB_PEDIDO_CABE.CD_PEDIDO = DB_MOB_PEDIDO_LANCA.CD_PEDIDO 
            WHERE DB_MOB_PEDIDO_CABE.CD_PEDIDO = ${id} ORDER BY DB_MOB_PEDIDO_CABE.DTA_TRANS           
            `, []);

            return sale;
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }

    async findSaleLaunch(productId: string, saleId: string) {
        try {
            const saleLaunch = await executeTransaction(`SELECT * FROM DB_MOB_PEDIDO_LANCA WHERE CD_PRODUTO = ${productId} and CD_PEDIDO = ${saleId}`, []);

            return saleLaunch as ISaleLaunch;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async createSale({ closed, obs, tableId, total, launchs, userId }: ISalesRepositoryCreate) {
        try {
            var saleId: { CD_PEDIDO: number } = await executeTransaction(`SELECT COALESCE(MAX(CD_PEDIDO), 0) + 1 as CD_PEDIDO FROM DB_MOB_PEDIDO_CABE`, []);

            var sale: { CD_PEDIDO: number } = await executeTransaction(`
                INSERT INTO DB_MOB_PEDIDO_CABE (CD_PEDIDO, CD_MESA, OBS, TOTAL, FECHADO, CD_GARCOM, DTA_TRANS)
                VALUES (${saleId[0].CD_PEDIDO}, ${tableId}, '${obs}', ${total}, '${closed}', ${userId}, CURRENT_TIMESTAMP)
                RETURNING CD_PEDIDO
            `, []);

            for (let i = 0; i < launchs.length; i++) {
                await executeTransaction(`
                INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
                    total_produto, obs_produto, cd_pedido, adicional_produto)
                    VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${launchs[i].productId}, 
                    '${launchs[i].productDescription}', 
                    ${launchs[i].price}, 
                    ${launchs[i].descount}, 
                    ${launchs[i].quantity}, 
                    ${launchs[i].totalProduct}, 
                    '${launchs[i].obsProduct}',
                     ${sale.CD_PEDIDO},
                     '${launchs[i].additional}'
                    )`, []);
            }

            await executeTransaction(`update db_mob_mesas set ocupada = 'S', cd_pedido = ${saleId[0].CD_PEDIDO} where cd_mesa = ${tableId}`, []);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async addToSale({ launchs, saleId }: ISalesLaunchRepositoryUpdate) {
        try {
            for (let i = 0; i < launchs.length; i++) {
                let product = await executeTransaction(`
                    select cd_produto, cd_pedido from db_mob_pedido_lanca where cd_produto = ${launchs[i].productId} and cd_pedido = ${saleId}
                `, []);

                if (product.length <= 0) {
                    await executeTransaction(`
                    INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
                        total_produto, obs_produto, cd_pedido, status_lanca, adicional_produto)
                        VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${launchs[i].productId}, '${launchs[i].productDescription}', ${launchs[i].price}, ${launchs[i].descount}, ${launchs[i].quantity}, ${launchs[i].totalProduct}, '${launchs[i].obsProduct}', ${saleId}, '0', '${launchs[i].additional}'
                        )`, []);
                } else {
                    await executeTransaction(`
                        UPDATE DB_MOB_PEDIDO_LANCA SET
                        QTD_PRODUTO = QTD_PRODUTO + ${launchs[i].quantity}
                    `, []);
                }
            }

        } catch (err) {
            Promise.reject(err);
            console.log(err);
        }
    }

    async listSales(userId: string) {
        try {
            const sales = await executeTransaction(`SELECT * FROM DB_MOB_PEDIDO_CABE WHERE CD_GARCOM = ${userId} ORDER BY DTA_TRANS`, []);

            return sales;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async updateSale({ obs, total, id }: ISalesRepository) {
        try {
            await executeTransaction(`UPDATE db_mob_pedido_cabe set obs = '${obs}', total = ${total} where cd_pedido = ${id}`, [])
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
                OBS_PRODUTO = '${obsProduct}',
                DESCONTO_PRODUTO = ${descount}
                WHERE ITEN = ${id}
            `, []);
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