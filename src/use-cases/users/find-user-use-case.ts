import { UsersRepository } from "../../repositories/users/IUsersRepository";

export class FindUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute(id: string) {
        try {
            const user = await this.usersRepository.find(id);

            if (!user[0]) {
                return Promise.reject('Usuário não encontrado')
            }

            return user;
        } catch (err) {
            return Promise.reject(err)
        }
    }
}