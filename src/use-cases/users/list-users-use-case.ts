import { IUsersRepository, UsersRepository } from "../../repositories/users/IUsersRepository";

export class ListUsersUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute() {
        try {
            const users = await this.usersRepository.list();

            return users;
        } catch (err) {
            return Promise.reject(err)
        }
    }
}