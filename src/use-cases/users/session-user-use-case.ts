import { UsersRepository } from "../../repositories/users/IUsersRepository";

export class SessionUserUseCase {
    constructor(
        private usersRepositories: UsersRepository
    ) { }

    async execute(id: string) {
        try {
            const session = await this.usersRepositories.session(id);

            return session
        } catch (err) {
            return Promise.reject(err)
        }
    }
}