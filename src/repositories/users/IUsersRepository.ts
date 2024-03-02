export type IUsersRepository = {
    id: string;
    name: string;
    password: string
}

export type IUsersRepositoryAuthData = {
    id: string;
    name: string;
}

export type UsersRepository = {
    find: (id: string) => Promise<IUsersRepository[] | any>;
    session: (id: string) => Promise<void>;
    list: () => Promise<IUsersRepository[]>;
}