import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { ITablesRepository, TablesRepository } from "../ITablesRepository";

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
            await executeTransaction(`update db_mob_mesas set ocupada = 'S' where cd_mesa = ${id}`, []);
        } catch (err) {
            return Promise.reject(err)
        }
    };
}