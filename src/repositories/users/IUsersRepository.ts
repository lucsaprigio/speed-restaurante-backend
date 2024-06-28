export type IUsersRepository = {
    id: string;
    name: string;
    password: string;
    commission: number;
    initial: string;
    final: string;
}

export type IUsersRepositoryAuthData = {
    id: string;
    password: string;
}

export type UsersRepository = {
    find: (id: string) => Promise<IUsersRepository>;
    session: (id: string) => Promise<void>;
    list: () => Promise<IUsersRepository[]>;
}