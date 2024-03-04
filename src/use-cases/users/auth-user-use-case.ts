import { sign } from "jsonwebtoken";
import { IUsersRepositoryAuthData, UsersRepository } from "../../repositories/users/IUsersRepository";

export class AuthUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute({ id, password }: IUsersRepositoryAuthData) {
        try {

            const user = await this.usersRepository.find(id);
            if (user.password.toString() !== password) {
                return Promise.reject('Usuário ou senha incorretos');
            }

            const { id: userId, name } = user;
            const token = sign({ id: user.id, }, process.env.JWT_SECRET, { expiresIn: "1d" });

            return { userId, name, token };
        } catch (err) {
            console.log(err)
            return Promise.reject(err);
        }
    }
}