import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { getCurrentDate } from "../../../utils/date";
import { IUsersRepository, UsersRepository } from "../IUsersRepository";

export class FirebirdUserRepository implements UsersRepository {
    async find(id: string) {
        try {
            const user = await executeQuery(`SELECT * FROM DB_MOB_OPERADORES WHERE CD_OPERADOR = ${id}`, []);

            if (!user[0]) {
                return Promise.reject('Usuário não encontrado.');
            }

            return {
                id: user[0].CD_OPERADOR,
                name: user[0].NOME_OPERADOR,
                password: user[0].SENHA_OPERADOR
            } as IUsersRepository;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    async session(id: string) {
        const dateFormatted = getCurrentDate();

        await executeTransaction(`update DB_MOB_OPERADORES set ult_sessao = '${dateFormatted}' where cd_operador = ?`, [id])
            .catch(error => {
                console.log('Erro na sessão:', error),
                    console.log(dateFormatted);
            })
    }

    async list() {
        try {
            const users = await executeQuery(`SELECT * FROM DB_MOB_OPERADORES`, []);


            return users as IUsersRepository[];
        } catch (err) {
            return Promise.reject(err)
        }
    }
}