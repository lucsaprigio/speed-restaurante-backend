import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { ITablesRepository, TablesRepository } from "../ITablesRepository";

/* 
CREATE TABLE DB_MOB_MESAS (
    CD_MESA INTEGER NOT NULL,
    OCUPADA VARCHAR(1),
    CD_PEDIDO INTEGER);

ALTER TABLE DB_MOB_MESAS
ADD CONSTRAINT PK_DB_MOB_MESAS
PRIMARY KEY (CD_MESA);
*/

export class FirebirdTablesRepository implements TablesRepository {
    async find(id: string) {
        try {
            const table = await executeQuery(`SELECT * FROM DB_MOB_MESAS WHERE CD_MESA = ${id}`, []);

            return table[0] as ITablesRepository[];
        } catch (err) {
            return Promise.reject(err);
        }
    };

    async list(): Promise<ITablesRepository[] | any> {
        try {
            const tables = await executeQuery(`SELECT * FROM DB_MOB_MESAS`, []);

            return tables;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    async setBusy(id: string) {
        try {
            var saleId: { CD_PEDIDO: number } = await executeTransaction(`SELECT COALESCE(MAX(CD_PEDIDO), 0) + 1 as CD_PEDIDO FROM DB_MOB_PEDIDO_CABE`, []);
            console.log(saleId[0].CD_PEDIDO);

            console.log(`update db_mob_mesas set ocupada = 'S', cd_pedido = ${saleId[0]} where cd_mesa = ${id}`);

            await executeTransaction(`update db_mob_mesas set ocupada = 'S', cd_pedido = ${saleId[0].CD_PEDIDO} where cd_mesa = ${id}`, []);
        } catch (err) {
            return Promise.reject(err)
        }
    };
}