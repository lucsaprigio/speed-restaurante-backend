import { Router, Request, Response } from "express";
import { FirebirdUserRepository } from "./repositories/users/firebird/FirebirdUserRepository";
import { AuthUserUseCase } from "./use-cases/users/auth-user-use-case";
import { ListUsersUseCase } from "./use-cases/users/list-users-use-case";
import { FirebirdTablesRepository } from "./repositories/tables/firebird/FirebirdTablesRepository";
import { FirebirdProductRepository } from "./repositories/products/firebird/FirebirdProductsRepository";
import { FindTableUseCase } from "./use-cases/tables/find-table-use-case";
import { ListTableUseCase } from "./use-cases/tables/list-tables-use-case";
import { SetBusyTableUseCase } from "./use-cases/tables/set-busy-table-use-case";
import { FirebirdSalesRepository } from "./repositories/sales/firebird/FirebirdSalesRepository";
import { CreateSaleUseCase } from "./use-cases/sales/create-sale-use-case";
import { ISalesRepositoryCreate } from "./repositories/sales/ISalesRepository";
import { FindSaleUseCase } from "./use-cases/sales/find-sale-use-case";
import { FindProductUseCase } from "./use-cases/products/find-product-use-case";
import { ListProductsUseCase } from "./use-cases/products/list-products-use-case";
import { IProductsRepository } from "./repositories/products/IProductsRepository";
import { ListCategoriesUseCase } from "./use-cases/categories/list-categories-use-case";
import { FirebirdCategoriesRepository } from "./repositories/categories/Firebird/FirebirdCategoriesRepository";
import { AddToSateUseCase } from "./use-cases/sales/add-to-sale-use-case";
import { UpdateSaleUseCase } from "./use-cases/sales/update-sale-use-case";
import { ListAllProductsUseCase } from "./use-cases/products/list-all-products-use-case";
import { SessionUserUseCase } from "./use-cases/users/session-user-use-case";
import { ListProductComplementsUseCase } from "./use-cases/complements/list-product-complements-use-case";

export const router = Router();

const firebirdUserRepository = new FirebirdUserRepository();
const firebirdTablesRepository = new FirebirdTablesRepository();
const firebirdProductsRepository = new FirebirdProductRepository();
const firebirdSalesRepository = new FirebirdSalesRepository();
const firebirdCategoriesRepository = new FirebirdCategoriesRepository();

// User
const authUserUseCase = new AuthUserUseCase(firebirdUserRepository);
const listUsersUseCase = new ListUsersUseCase(firebirdUserRepository);
const sessionUserUsecase = new SessionUserUseCase(firebirdUserRepository);

// Tables (Mesas)
const findTableUseCase = new FindTableUseCase(firebirdTablesRepository);
const listTablesUseCase = new ListTableUseCase(firebirdTablesRepository);
const setBusyTableUseCase = new SetBusyTableUseCase(firebirdTablesRepository);

// Sales (Vendas)
const createSaleUseCase = new CreateSaleUseCase(firebirdSalesRepository);
const findSaleUseCase = new FindSaleUseCase(firebirdSalesRepository);
const addToSaleUseCase = new AddToSateUseCase(firebirdSalesRepository);
const updateSaleUseCase = new UpdateSaleUseCase(firebirdSalesRepository);

// Produtos
const listProductsUseCase = new ListProductsUseCase(firebirdProductsRepository);
const findProductUseCase = new FindProductUseCase(firebirdProductsRepository);
const listProductComplementsUseCase = new ListProductComplementsUseCase(firebirdProductsRepository);

// Categorias
const listCategoriesUseCase = new ListCategoriesUseCase(firebirdCategoriesRepository);

router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { userId, password } = req.body;
        console.log(userId, password);

        const user = await authUserUseCase.execute({ id: userId, password });

        res.status(201).json({ user });
        console.log(user);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/session/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const session = await sessionUserUsecase.execute(userId);

        res.status(201).json({ session });
    } catch (err) {
        res.status(402).json({ err });
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

router.post('/new-sale', async (req: Request, res: Response) => {
    try {
        const { tableId, obs, total, launchs, userId }: ISalesRepositoryCreate = req.body;

        await setBusyTableUseCase.execute(tableId);

        await createSaleUseCase.execute({ tableId, obs, total, closed: 'N', launchs, userId });

        res.status(201).json({ message: 'Venda criada com sucesso!' });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/sale/:saleId', async (req: Request, res: Response) => {
    try {
        const { saleId } = req.params;

        const sale = await findSaleUseCase.execute(saleId);

        res.status(201).json(sale)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/update-sale/:saleId', async (req: Request, res: Response) => {
    try {
        const { saleId } = req.params;
        const { launchs, tableId, obs, total, userId } = req.body;

        await updateSaleUseCase.execute({ tableId, obs, total, userId });

        await addToSaleUseCase.execute({ launchs, saleId });

    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/products', async (req: Request, res: Response) => {
    try {
        const products: IProductsRepository[] = await listProductsUseCase.execute();
        // const products: IProductsRegistered[] = await listAllProducts.execute();

        res.status(201).json(products);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/product/:productId', async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const product = await findProductUseCase.execute(productId);

        res.status(201).json({ product });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/complement/:productId', async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const complements = await listProductComplementsUseCase.execute(productId);

        res.status(201).json({ complements });
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});


router.get('/categories', async (req: Request, res: Response) => {
    try {
        const categories = await listCategoriesUseCase.execute();

        res.status(201).json(categories);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

