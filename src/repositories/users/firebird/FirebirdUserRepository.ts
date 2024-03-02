import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { getCurrentDate } from "../../../utils/date";
import { IUsersRepository, UsersRepository } from "../IUsersRepository";

export class FirebirdUserRepository implements UsersRepository {
    async find(id: string) {
        try {
            const user = await executeQuery(`SELECT * FROM DB_MOB_USUARIO WHERE CD_USUARIO = ${id}`, []);

            return user as IUsersRepository[] | any;

        } catch (err) {
            return Promise.reject(err);
        }
    };

    async session(id: string) {
        const dateFormatted = getCurrentDate();

        await executeTransaction(`update db_mob_operador set ult_sessao = '${dateFormatted}' where cd_operador = ?`, [id])
            .catch(error => {
                console.log('Erro na sessão:', error),
                    console.log(dateFormatted);
            })
    }

    async list() {
        try {
            const users = await executeQuery(`SELECT * FROM DB_MOB_OPERADOR`, []);


            return users as IUsersRepository[];
        } catch (err) {
            return Promise.reject(err)
        }
    }
}