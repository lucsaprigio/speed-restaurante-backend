import { executeQuery, executeTransaction } from "../../../firebird/firebird";
import { getLocalCurrentDate, getLocalDate } from "../../../utils/date";
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
            const user = await executeQuery(`SELECT * FROM DB_MOB_REST_GARCOM WHERE CD_GARCOM = ${id}`, []);

            if (!user[0]) {
                return Promise.reject('Usuário não encontrado.');
            }
            console.log(user)

            return {
                id: user[0].CD_GARCOM,
                name: user[0].NOME_GARCOM,
                password: user[0].SENHA_GARCOM,
                commission: user[0].COMISSAO_GARCOM,
                initial: user[0].HORARIO_INICIO,
                final: user[0].HORARIO_FIM
            } as IUsersRepository;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    async session(id: string) {
        try {
            const session = await executeTransaction(`SELECT HORARIO_INICIO, HORARIO_FIM FROM DB_MOB_REST_GARCOM WHERE CD_GARCOM = ?`, [id]);

            const localHour = getLocalCurrentDate(new Date());

            const hourWorkUser = getLocalDate(session[0].HORARIO_INICIO, session[0].HORARIO_FIM);

            console.log({
                localHour,
                hourWorkUser
            })

            if (localHour < hourWorkUser.timeInitialNumber || localHour > hourWorkUser.timeFinalNumber) {
                return Promise.reject('Usuário fora do horário de operação.')
            }

            return hourWorkUser as any;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async list() {
        try {
            const users = await executeQuery(`SELECT CD_GARCOM as userId, NOME_GARCOM as name FROM DB_MOB_REST_GARCOM`, []);


            return users as IUsersRepository[];
        } catch (err) {
            return Promise.reject(err)
        }
    }
}