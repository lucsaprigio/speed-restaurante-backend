import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { getCurrentDate } from "../../../utils/date";
import { IUsersRepository, UsersRepository } from "../IUsersRepository";

/* 
CREATE TABLE DB_MOB_OPERADORES (
    CD_OPERADOR INTEGER NOT NULL,
    NOME_OPERADOR VARCHAR(30),
    SENHA_OPERADOR VARCHAR(20));

ALTER TABLE DB_MOB_OPERADORES
ADD CONSTRAINT PK_DB_MOB_OPERADORES
PRIMARY KEY (CD_OPERADOR);

CREATE SEQUENCE GEN_DB_MOB_OPERADORES_ID;
*/

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
            const users = await executeQuery(`SELECT CD_OPERADOR as userId, NOME_OPERADOR as name FROM DB_MOB_OPERADORES`, []);


            return users as IUsersRepository[];
        } catch (err) {
            return Promise.reject(err)
        }
    }
}