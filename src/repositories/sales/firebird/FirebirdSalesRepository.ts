import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { ISaleLaunch, ISalesLaunchRepositoryUpdate, ISalesRepository, ISalesRepositoryCreate, SalesRepository } from "../ISalesRepository";

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

/* 
CREATE TABLE DB_MOB_PEDIDO_LANCA (
    ITEN INTEGER NOT NULL,
    CD_PRODUTO INTEGER,
    DESCRICAO_PRODUTO VARCHAR(50),
    UNIT_PRODUTO NUMERIC(15,2),
    DESCONTO_PRODUTO NUMERIC(15,2),
    QTD_PRODUTO INTEGER,
    TOTAL_PRODUTO NUMERIC(15,2),
    OBS_PRODUTO VARCHAR(50),
    CD_PEDIDO INTEGER);

ALTER TABLE DB_MOB_PEDIDO_LANCA
ADD CONSTRAINT PK_DB_MOB_PEDIDO_LANCA
PRIMARY KEY (ITEN);

CREATE SEQUENCE DB_MOB_PEDIDO_LANCA;
*/

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

    async findSaleLaunch(productId: string, saleId: string) {
        try {
            const saleLaunch = await executeTransaction(`SELECT * FROM DB_MOB_PEDIDO_LANCA WHERE CD_PRODUTO = ${productId} and CD_PEDIDO = ${saleId}`, []);

            return saleLaunch as ISaleLaunch;
        } catch (err) {
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
                let product = await executeTransaction(`
                    select cd_produto, cd_pedido from db_mob_pedido_lanca where cd_produto = ${launchs[i].productId} and cd_pedido = ${saleId}
                `, []);

                if (product.length <= 0) {
                    await executeTransaction(`
                    INSERT INTO DB_MOB_PEDIDO_LANCA (iten, cd_produto, descricao_produto, unit_produto, desconto_produto, qtd_produto,
                        total_produto, obs_produto, cd_pedido, status_lanca)
                        VALUES ( gen_id(DB_MOB_PEDIDO_LANCA, 1), ${launchs[i].productId}, '${launchs[i].productDescription}', ${launchs[i].price}, ${launchs[i].descount}, ${launchs[i].quantity}, ${launchs[i].totalProduct}, '${launchs[i].obsProduct}', ${saleId}, '0'
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

    async updateSale({ closed, obs, tableId, total }: ISalesRepository) {
        try {
            await executeTransaction(`UPDATE db_mob_pedido_cabe
            set cd_mesa = '${tableId}',
                obs = '${obs}',
                fechado = '${closed}',
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