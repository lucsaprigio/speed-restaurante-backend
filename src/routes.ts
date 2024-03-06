import { Router, Request, Response } from "express";
import { FirebirdUserRepository } from "./repositories/users/firebird/FirebirdUserRepository";
import { AuthUserUseCase } from "./use-cases/users/auth-user-use-case";
import { ListUsersUseCase } from "./use-cases/users/list-users-use-case";
import { FirebirdTablesRepository } from "./repositories/tables/firebird/FirebirdTablesRepository";
import { FirebirdProductRepository } from "./repositories/products/firebird/FirebirdProductsRepository";
import { FindTableUseCase } from "./use-cases/tables/find-table-use-case";
import { ListTableUseCase } from "./use-cases/tables/list-tables-use-case";
import { SetBusyTableUseCase } from "./use-cases/tables/set-busy-table-use-case";

export const router = Router();

const firebirdUserRepository = new FirebirdUserRepository();
const firebirdTablesRepository = new FirebirdTablesRepository();
const firebirdProductsRepository = new FirebirdProductRepository();

const authUserUseCase = new AuthUserUseCase(firebirdUserRepository);
const listUsersUseCase = new ListUsersUseCase(firebirdUserRepository);

const findTableUseCase = new FindTableUseCase(firebirdTablesRepository);
const listTablesUseCase = new ListTableUseCase(firebirdTablesRepository);
const setBusyTableUseCase = new SetBusyTableUseCase(firebirdTablesRepository);

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body;

        const user = await authUserUseCase.execute({ id: userId, password });

        res.status(201).json({ user });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/users', async (req: Request, res: Response) => {
    try {
        const user = await listUsersUseCase.execute();

        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/tables', async (req: Request, res: Response) => {
    try {
        const tables = await listTablesUseCase.execute();

        res.status(201).json(tables);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});